import { Component } from '@angular/core';
import {CardListComponent} from "../card-list/card-list.component";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {DeckDetailsComponent} from "./deck-details/deck-details.component";
import {Card} from "../../models/card.model";
import {Deck} from "../../models/deck.model";
import {Router} from "@angular/router";
import {CurrentDeckService} from "../../core/local/current-deck.service";
import {CardService} from "../../core/card.service";
import {TagService} from "../../core/tag.service";
import {ImagesService} from "../../core/images.service";
import {DeckService} from "../../core/deck.service";

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

  constructor(private router: Router, private currentDeck: CurrentDeckService, private cardService: CardService) {
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

}
