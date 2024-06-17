import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Deck} from "../../../models/deck.model";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgFor} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserComponent} from "../../user-list/user/user.component";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    NgFor,
    MatButton,
    UserComponent,
    RouterLink
  ],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent {

  @Input() deck!: Deck;
  @Output() startTrainingEmitter = new EventEmitter<any>();


  constructor() {
  }

  startTraining() {
    this.startTrainingEmitter.emit();
  }

}
