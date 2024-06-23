import {Component, ViewChild} from '@angular/core';
import {CardListComponent} from "../card-list/card-list.component";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {Deck} from "../../models/deck.model";
import {Router} from "@angular/router";
import {CurrentDataService} from "../../core/local/current-data.service";
import {Card} from "../../models/card.model";
import {CardService} from "../../core/card.service";
import {lastValueFrom} from "rxjs";
import {TagService} from "../../core/tag.service";
import {ImagesService} from "../../core/images.service";
import {DeckService} from "../../core/deck.service";

@Component({
  selector: 'app-own-deck',
  standalone: true,
    imports: [
        CardListComponent,
        DeckDetailsFormComponent
    ],
  templateUrl: './own-deck.component.html',
  styleUrl: './own-deck.component.scss'
})
export class OwnDeckComponent {

  @ViewChild(CardListComponent) cardListComponent!: CardListComponent;

  deck?: Deck;
  deckCards?: Card[];
  displayText: string = 'Actualizar mazo';
  receivedDeck?: Deck;
  receivedCardList?: Card[];

  constructor(private router: Router, private currentDeck: CurrentDataService, private cardService: CardService,
              private tagService: TagService, private imagesService: ImagesService, private deckService: DeckService,
              private currentDataService: CurrentDataService) {
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

  async handleDeckUpdate(data: { deck: Deck, publish: boolean }) {
    this.receivedDeck = data.deck;
    this.receivedDeck._id = this.deck!._id!;
    console.log(this.deck);
    console.log(this.receivedDeck);

    await Promise.all([this.updateDeck(),this.updateCards()]);
    if (data.publish) this.publishDeck();
  }

  publishDeck() {
    this.deckService.publishDeck(this.deck!._id!).subscribe(
      {
        next: response => {
          console.log(response)
          this.deck!.isPublished = true;
          this.currentDataService.deck = this.deck!;
          this.router.navigate(['/deck']).then(() => {
            console.log('Navigation complete: ' + this.router.url);
          }).catch(error => {
            console.error('Navigation error:', error);
          });
        },
        error: (error: any) => {
          console.log(error);
          if (error.status == 400) alert('No esta permitido crear un mazo sin cartas.');
        }
      }
    );
  }

  async updateDeck(): Promise<void> {
    this.receivedCardList = this.cardListComponent.cardList;
    if (this.receivedDeck == undefined ||
      this.receivedCardList == undefined) {
      return;
    }

    const getTagsIdPromise = this.getDeckTagsId(this.receivedDeck);
    let getDeckImagePathPromise;
    if (this.receivedDeck.imageFile){
      getDeckImagePathPromise = this.saveImage(this.receivedDeck.imageFile);
    }

    const [deckWithTagsId, imagePath] = await Promise.all([getTagsIdPromise, getDeckImagePathPromise]);
    if (imagePath) {
      deckWithTagsId.image = imagePath.body;
    }

    this.callUpdateDeck(deckWithTagsId);
  }

  callUpdateDeck(deck: Deck) {
    this.deckService.updateDeck(deck).subscribe(
      {
        next: response => {
          console.log("Updated deck: " + response.body.title);
        },
        error: (error: any) => { console.log(error) }
      }
    );
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

  async updateCards() {
    if (!this.receivedCardList || !this.deck?._id) return;
    console.log("deckID" +  this.deck._id);

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

      card.deck = this.deck._id;
      if (card._id) await this.callUpdateCard(card);
      else await this.callCreateCard(card);
    }
  }

  async callUpdateCard(card: Card) {
    this.cardService.updateCard(card).subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  async callCreateCard(card: Card) {
    this.cardService.createCard(card).subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }
}
