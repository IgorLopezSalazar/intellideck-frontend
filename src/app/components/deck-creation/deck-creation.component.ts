import {Component, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DeckService} from "../../core/deck.service";
import {Deck} from "../../models/deck.model";
import {NgIf} from "@angular/common";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {CardListComponent} from "../card-list/card-list.component";
import {TagService} from "../../core/tag.service";
import {ImagesService} from "../../core/images.service";
import {Card} from "../../models/card.model";
import {CardService} from "../../core/card.service";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {CurrentDataService} from "../../core/local/current-data.service";

@Component({
  selector: 'app-deck-creation',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    MatIcon,
    MatButton,
    NgIf,
    MatError,
    DeckDetailsFormComponent,
    CardListComponent
  ],
  templateUrl: './deck-creation.component.html',
  styleUrl: './deck-creation.component.scss'
})
export class DeckCreationComponent {

  @ViewChild(CardListComponent) cardListComponent!: CardListComponent;

  receivedDeck?: Deck;
  receivedCardList?: Card[];

  constructor(private deckService: DeckService, private tagService: TagService, private router: Router,
              private imagesService: ImagesService, private cardService: CardService, private currentDataService: CurrentDataService) {
  }

  async handleDeckCreation(data: { deck: Deck, publish: boolean }) {
    this.receivedDeck = data.deck;

    let deck  = await this.createDeck();
    if (deck?._id != undefined) {
      await this.createCards(deck._id);

      this.currentDataService.deck = this.receivedDeck;
      this.currentDataService.deck._id = deck._id;

      this.router.navigate(['/own-deck']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }
  }

  async createDeck(): Promise<Deck | undefined> {
    this.receivedCardList = this.cardListComponent.cardList;
    if (this.receivedDeck == undefined ||
        this.receivedCardList == undefined) {
      return undefined;
    }

    console.log(this.receivedDeck)
    const getTagsIdPromise = this.getDeckTagsId(this.receivedDeck);
    let getDeckImagePathPromise;
    if (this.receivedDeck.imageFile){
      getDeckImagePathPromise = this.saveImage(this.receivedDeck.imageFile);
    }

    const [deckWithTagsId, imagePath] = await Promise.all([getTagsIdPromise, getDeckImagePathPromise]);
    if (imagePath) {
      deckWithTagsId.image = imagePath.body;
    }
    return await this.callCreateDeck(deckWithTagsId);
  }

  callCreateDeck(deck: Deck): Promise<Deck> {
    return new Promise(resolve => {
      this.deckService.createDeck(deck).subscribe(
        {
          next: response => {
            console.log(response);
            resolve(response.body);
          },
          error: (error: any) => { console.log(error) }
        }
      );
    });
  }

  async getDeckTagsId(deck: Deck) {
    await Promise.all(
      deck.tags?.map(async tag => {
        const response = await lastValueFrom(this.tagService.getTag(tag));
        tag.id = response.body._id;
      })
    );

    return deck;
  }

  async saveImage(file: File) {
    return await lastValueFrom(this.imagesService.postImage(file));
  }

  async createCards(deckID: string) {
    if (!this.receivedCardList) return;
    console.log("deckID" +  deckID);

    for (let i = 0; i < this.receivedCardList.length; i++) {
      const card = this.receivedCardList[i];
      let getCardImagePathPromise;
      console.log(i)

      if (card.imageFile) {
        getCardImagePathPromise = this.saveImage(card.imageFile);
      }

      const [imagePath] = await Promise.all([getCardImagePathPromise]);
      if (imagePath) {
        card.image = imagePath.body;
      }

      card.deckId = deckID;
      const createdCard = await this.callCreateCard(card);
      if (createdCard) {
        if (this.receivedDeck!.cards == undefined) this.receivedDeck!.cards = [];
        this.receivedDeck!.cards.push(createdCard.body);
      }
    }
  }

  async callCreateCard(card: Card) {
    return await lastValueFrom(this.cardService.createCard(card));
  }
}
