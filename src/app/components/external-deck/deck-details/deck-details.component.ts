import {Component, Input} from '@angular/core';
import {Deck} from "../../../models/deck.model";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgFor} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserComponent} from "../../user-list/user/user.component";
@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    NgFor,
    MatButton,
    UserComponent
  ],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent {

  @Input() deck!: Deck;

}
