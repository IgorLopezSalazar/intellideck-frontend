import {Component} from '@angular/core';
import {CardTrainingService} from "../../core/trainings/card-training.service";
import {DeckTrainingService} from "../../core/trainings/deck-training.service";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-card-training',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './card-training.component.html',
  styleUrl: './card-training.component.scss'
})
export class CardTrainingComponent {

  constructor(private cardTrainingService: CardTrainingService, private deckTrainingService: DeckTrainingService) {
    console.log("training")
  }

  wrongAnswer() {

  }

  correctAnswer() {

  }

}
