import {Component} from '@angular/core';
import {CardListComponent} from "../card-list/card-list.component";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {DeckDetailsComponent} from "./deck-details/deck-details.component";
import {Card} from "../../models/card.model";
import {Deck} from "../../models/deck.model";
import {Router} from "@angular/router";
import {CurrentDeckService} from "../../core/local/current-deck.service";
import {CardService} from "../../core/card.service";
import {DeckTrainingService} from "../../core/trainings/deck-training.service";
import {Backtrack, DeckTraining} from "../../models/deck-training.model";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

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

  deck?: Deck;
  deckCards?: Card[];

  constructor(private router: Router, private currentDeck: CurrentDeckService, private cardService: CardService,
              private deckTrainingService: DeckTrainingService) {
    this.deck = this.currentDeck.deck

    if (!this.deck) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }

    this.getDeckCards();
  }

  getDeckCards() {
    if (this.deck!._id) {
      this.cardService.getCardsFromDeck(this.deck!._id).subscribe(
        {
          next: response => {
            this.deckCards = response.body;
          },
          error: (error: any) => { console.log(error) }
        }
      );
    }
  }

  handleStartTraining() {
    console.log("startTraining");
    if (!this.deck?._id) return;

    let deckTraining = this.deckTrainingService.getDeckTraining(this.deck._id).subscribe(
      {
        next: (response) => {
          console.log(response);
          console.log(response.body);
          },
        error: (error: any) => console.log(error)
      }
    );

    // let deckTraining = new DeckTraining(
    //   7,
    //   Backtrack.BACKTRACK_FIRST,
    //   this.deck!._id!
    // );
    //
    // this.deckTrainingService.createDeckTraining(deckTraining).subscribe(
    //   {
    //     next: (response) => {
    //       console.log(response);
    //       console.log(response.body);
    //     },
    //     error: (error: any) => console.log(error)
    //   }
    // );
  }
}
