import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card-list/card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {DeckComponent} from "./deck/deck.component";
import {Deck} from "../../models/deck.model";

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    DeckComponent,
    NgIf
  ],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss'
})
export class DeckListComponent {

  @Input() deckList!: Deck[];

}
