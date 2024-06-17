import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {CurrentDataService} from "../../core/local/current-data.service";
import {CardTraining} from "../../models/card-training.model";
import {Card, WhereImageEnum} from "../../models/card.model";
import {Router} from "@angular/router";
import {Backtrack} from "../../models/deck-training.model";
import {DeckTrainingService} from "../../core/trainings/deck-training.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-card-training',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    NgClass
  ],
  templateUrl: './card-training.component.html',
  styleUrl: './card-training.component.scss'
})
export class CardTrainingComponent {

  protected readonly WhereImageEnum = WhereImageEnum;

  private cardsTraining: CardTraining[] = [];
  private index: number = 0;
  currentCard!: Card;
  showAnswer: boolean = false;
  startTime?: number;

  constructor(private currentDataService: CurrentDataService, private router: Router,
              private deckTrainingService: DeckTrainingService) {
    console.log("training");
    console.log(this.currentDataService.cardsTraining);
    if (!this.currentDataService.cardsTraining?.at(0)?.card) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
      return;
    }

    this.cardsTraining = this.currentDataService.cardsTraining;
    this.loadCurrentCardInfo();

    this.startTime = new Date().getTime();
  }

  loadCurrentCardInfo() {
    this.currentCard = this.cardsTraining[this.index].card!;
    if (!this.cardsTraining[this.index].isShown)
      this.continueTraining();
  }

  toggleShowAnswer() {
    this.showAnswer = true;
  }

  wrongAnswer(event: Event) {
    event.stopPropagation();

    if (this.cardsTraining[this.index].deckTraining?.backtrack && this.currentDataService.isOfficialTraining) {
      if (this.cardsTraining[this.index].deckTraining!.backtrack === Backtrack.BACKTRACK_PRIOR && this.cardsTraining[this.index].box > 1)
        this.cardsTraining[this.index].box = this.cardsTraining[this.index].box--;
      else if (this.cardsTraining[this.index].deckTraining!.backtrack === Backtrack.BACKTRACK_FIRST)
        this.cardsTraining[this.index].box = 1;
    }

    this.continueTraining();
  }

  correctAnswer(event: Event) {
    event.stopPropagation();

    if (this.cardsTraining[this.index].box < this.cardsTraining[this.index].deckTraining?.boxAmount! &&
        this.currentDataService.isOfficialTraining)
      this.cardsTraining[this.index].box++;

    this.continueTraining();
  }

  continueTraining() {
    if (this.index < this.cardsTraining.length - 1)
      this.nextCard();
    else
      this.finishTraining();
  }

  nextCard() {
    this.index++;
    this.loadCurrentCardInfo();
    this.showAnswer = false;
  }

  async finishTraining() {
    let completionTimeSeconds = (new Date().getTime() - this.startTime!) / 1000;
    this.currentDataService.completionTimeSeconds = completionTimeSeconds;
    if (this.currentDataService.isOfficialTraining) {
      console.log(completionTimeSeconds)
      console.log(this.cardsTraining)

      try {
        const response = await lastValueFrom(this.deckTrainingService.updateDeckTraining(this.cardsTraining, completionTimeSeconds));
        this.currentDataService.deckTraining = response.body;
        console.log(response);
      }
      catch (error: any) {
        console.log(error)
      }
    }

    let url;
    if (this.currentDataService.isOfficialTraining) {
      url = '/statistics';
    }
    else {
      this.currentDataService.finishTraining(false);
      url = '/deck';
    }

    this.router.navigate([url]).then(() => {
      console.log('Navigation complete: ' + this.router.url);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
