import {Component, ViewChild} from '@angular/core';
import {CardListComponent} from "../card-list/card-list.component";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {DeckDetailsComponent} from "./deck-details/deck-details.component";
import {Card} from "../../models/card.model";
import {Deck} from "../../models/deck.model";
import {Router} from "@angular/router";
import {CurrentDataService} from "../../core/local/current-data.service";
import {CardService} from "../../core/card.service";
import {DeckTrainingService} from "../../core/trainings/deck-training.service";
import {Backtrack, DeckTraining} from "../../models/deck-training.model";
import {CardTrainingService} from "../../core/trainings/card-training.service";
import {lastValueFrom, Subject} from "rxjs";
import {CardTraining} from "../../models/card-training.model";
import {
  StartUnofficialTrainingDialog
} from "./start-unofficial-training-dialog/start-unofficial-training-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-external-deck',
  standalone: true,
  imports: [
    CardListComponent,
    DeckDetailsFormComponent,
    DeckDetailsComponent
  ],
  templateUrl: './external-deck.component.html',
  styleUrl: './external-deck.component.scss'
})
export class ExternalDeckComponent {

  @ViewChild(CardListComponent) cardListComponent!: CardListComponent;

  deck?: Deck;
  deckCards?: Card[];
  cardsTrainingError: any;

  eventsSubject: Subject<Card []> = new Subject<Card []>();

  constructor(private router: Router, private currentDeck: CurrentDataService, private cardService: CardService,
              private deckTrainingService: DeckTrainingService, private cardTrainingService: CardTrainingService,
              private currentDataService: CurrentDataService, private dialog: MatDialog) {
    this.deck = this.currentDeck.deck

    if (!this.deck) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }


  }

  async ngOnInit() {
    this.getDeckCards();

    await this.getCardTrainings();
  }

  getDeckCards() {
    if (this.deck!._id) {
      this.cardService.getCardsFromDeck(this.deck!._id).subscribe(
        {
          next: response => {
            this.deckCards = response.body;
          },
          error: (error: any) => console.log(error)
        }
      );
    }
  }

  async getCardTrainings() {
    await this.getTodayDeckTrainingCards();
    await this.getAllDeckTrainingCards();

    this.deckCards?.map(
      (card: Card) => {
        let index = this.currentDataService.allCardsTrainings?.findIndex((cardTraining: CardTraining) => cardTraining.card!._id == card._id);
        if (index != undefined && index != -1) card.isShown = this.currentDataService.allCardsTrainings?.at(index)!.isShown!;
      }
    );

    if (this.cardsTrainingError?.status !== 404) {
      this.eventsSubject.next(this.deckCards!);
      this.currentDataService.deckTraining = this.currentDataService.cardsTraining![0].deckTraining!;
    }
  }

  async getAllDeckTrainingCards() {
    if (!this.deck?._id) return;

    try {
      const response = await lastValueFrom(this.cardTrainingService.getDeckTrainingCards(this.deck._id));
      if (!this.currentDataService.cardsTraining)
      {
        this.currentDataService.cardsTraining = response.body.map(
          (cardsTraining: CardTraining []) => this.currentDataService.cardsTraining = cardsTraining
        );
      }
      this.currentDataService.allCardsTrainings = response.body.map(
        (cardsTraining: CardTraining []) => this.currentDataService.allCardsTrainings = cardsTraining
      );
    }
    catch (error: any) {
      console.log(error)
      this.cardsTrainingError = error;
    }
  }

  async getTodayDeckTrainingCards() {
    if (!this.deck?._id) return;

    try {
      const response = await lastValueFrom(this.cardTrainingService.getTodayDeckTrainingCards(this.deck._id));
      if (response.status === 200) {
        this.currentDataService.cardsTraining = response.body.map(
          (cardsTraining: CardTraining []) => this.currentDataService.cardsTraining = cardsTraining
        );
        this.currentDataService.isOfficialTraining = true;
      }
    }
    catch (error: any) {
      console.log(error)
      this.cardsTrainingError = error;
    }
  }

  async handleViewCard({ index, isShown }: { index: number; isShown: boolean }) {
    if (this.currentDataService.cardsTraining) {
      this.cardTrainingService.updateCardTrainingVisibility(this.deck!._id!, this.deckCards!.at(index)!._id!, isShown).subscribe(
        {
          next: () => {
          },
          error: (error: any) => console.log(error)
        }
      );
    }
    else {
      this.deckCards!.at(index)!.isShown = isShown;
    }
    this.currentDataService.cardsTraining!.at(index)!.isShown = isShown;
  }

  async handleStartTraining() {
    console.log("startTraining");

    if (!this.currentDataService.cardsTraining && this.cardsTrainingError.status === 404) {
      await this.createDeckTraining();

      try {
        const response = await lastValueFrom(this.cardTrainingService.getTodayDeckTrainingCards(this.deck!._id!));
        this.currentDataService.cardsTraining = response.body.map(
          (cardsTraining: CardTraining []) => this.currentDataService.cardsTraining = cardsTraining
        );
        this.currentDataService.isOfficialTraining = true;
      }
      catch (error: any) {
        console.log(error);
      }
    }

    let continueTraining = true;
    if (!this.currentDataService.isOfficialTraining){
      const dialogRef = this.dialog.open(StartUnofficialTrainingDialog, {
        width: '30vw',
        height: 'auto',
        maxHeight: '80vh',
        panelClass: 'custom-dialog-container'
      });

      try {
        continueTraining = await lastValueFrom(dialogRef.afterClosed());
      }
      catch (error: any) {
        console.log(error);
      }
    }

    if (continueTraining) {
      this.router.navigate(['/training']).then(() => {
        console.log('Navigation complete: ' + this.router.url);
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }
  }

  async createDeckTraining() {
    let deckTraining = new DeckTraining(
      7,
      Backtrack.BACKTRACK_FIRST,
      this.deck!._id!,
      this.deckCards
    );

    try {
      const response = await lastValueFrom(this.deckTrainingService.createDeckTraining(deckTraining));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
