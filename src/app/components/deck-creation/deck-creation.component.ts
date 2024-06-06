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

  constructor(private deckService: DeckService, private tagService: TagService,
              private imagesService: ImagesService, private cardService: CardService) {
  }

  async handleDeckCreation(data: any) {
    this.receivedDeck = data;

    let deckID  = await this.createDeck();
    console.dir("DeckID: " + deckID);
    if (deckID != '') await this.createCards(deckID);
  }

  async createDeck(): Promise<string> {
    this.receivedCardList = this.cardListComponent.cardList;
    if (this.receivedDeck == undefined ||
        this.receivedCardList == undefined) {
      return '';
    }

    const getTagsIdPromise = this.getDeckTagsId(this.receivedDeck);
    let getDeckImagePathPromise;
    if (this.receivedDeck.image){
      getDeckImagePathPromise = this.saveImage(this.receivedDeck.image);
    }

    const [deckWithTagsId, imagePath] = await Promise.all([getTagsIdPromise, getDeckImagePathPromise]);
    if (imagePath) {
      deckWithTagsId.imagePath = imagePath.body;
    }
    return await this.callCreateDeck(deckWithTagsId);
  }

  callCreateDeck(deck: Deck): Promise<string> {
    return new Promise(resolve => {
      this.deckService.createDeck(deck).subscribe(
        {
          next: response => {
            console.log(response);
            resolve(response.body._id);
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

      if (card.image) {
        getCardImagePathPromise = this.saveImage(card.image);
      }

      const [imagePath] = await Promise.all([getCardImagePathPromise]);
      if (imagePath) {
        card.imagePath = imagePath.body;
      }

      card.deckId = deckID;
      await this.callCreateCard(card);
    }

    // for (const card of this.receivedCardList) {
    //   let getCardImagePathPromise;
    //   if (card.image){
    //     getCardImagePathPromise = this.saveImage(card.image);
    //   }
    //
    //   const [imagePath] = await Promise.all([getCardImagePathPromise]);
    //   if (imagePath) {
    //     card.image = imagePath.body;
    //   }
    //   card.deckId = deckID;
    //   await this.callCreateCard(card);
    // }
  }

  async callCreateCard(card: Card) {
    this.cardService.createDeck(card).subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }
}
