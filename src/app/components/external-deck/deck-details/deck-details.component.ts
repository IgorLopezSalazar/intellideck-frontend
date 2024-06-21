import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Deck} from "../../../models/deck.model";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgFor, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserComponent} from "../../user-list/user/user.component";
import {Router, RouterLink} from "@angular/router";
import {CurrentDataService} from "../../../core/local/current-data.service";
import {lastValueFrom} from "rxjs";
import {DeckService} from "../../../core/deck.service";
import {MatDialog} from "@angular/material/dialog";
import {DeckRatingDialog} from "./deck-rating-dialog/deck-rating-dialog.component";

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    NgFor,
    MatButton,
    UserComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent {
  private STAR_NUMBER: number = 5;

  @Input() deck!: Deck;
  @Output() startTrainingEmitter = new EventEmitter<any>();
  @Output() deleteDeckTrainingEmitter = new EventEmitter<any>();
  @Output() restartDeckTrainingEmitter = new EventEmitter<any>();
  isFollowingDeck: boolean = false;
  deckAverageRating?: number;
  isHalfStar: boolean = false;
  emptyStars: number = this.STAR_NUMBER;
  userDeckRating?: number;

  constructor(private currentDataService: CurrentDataService, private deckService: DeckService,
              private router: Router, public dialog: MatDialog,) {

  }

  async ngOnChanges() {
    this.isFollowingDeck = this.checkIfFollowing();

    if (this.deck.avgDeckRating) {
      this.setEndpointAverageRating(this.deck.avgDeckRating);
    }

    await this.getUserDeckRating();
  }

  async getUserDeckRating() {
    try {
      let userDeckRatingPromise = await lastValueFrom(this.deckService.getUserDeckRating(this.deck._id!));
      console.log(userDeckRatingPromise.body);
      this.userDeckRating = userDeckRatingPromise.body.rate / 2;
    } catch (error) {
      console.log(error);
    }
  }

  startTraining() {
    this.startTrainingEmitter.emit();
  }

  async followDeck() {
    try {
      const response = await lastValueFrom(this.deckService.updateDeckFollowStatus(this.deck._id!, !this.isFollowingDeck));
      this.currentDataService.userLogged = response.body;
      console.log(response)
    } catch (error: any) {
      console.log(error);
    }

    this.isFollowingDeck = this.checkIfFollowing();
  }

  checkIfFollowing(): boolean {
    console.log(this.currentDataService.userLogged?.followedDecks)
    if (this.currentDataService.userLogged?.followedDecks) {
      console.log(this.deck)
      return this.currentDataService.userLogged.followedDecks.some(followedDeck => followedDeck._id === this.deck._id);
    }
    return false;
  }

  async copyDeck() {
    try {
      let copyResponse = await lastValueFrom(this.deckService.copyDeck(this.deck));

      let newDeckResponse = await lastValueFrom(this.deckService.getDeck(copyResponse.body._id));
      this.currentDataService.deck = newDeckResponse.body;

      this.router.navigate(['/own-deck']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async deleteDeck() {
    try {
      if (this.deck._id) {
        await lastValueFrom(this.deckService.deleteDeck(this.deck._id));
      }

      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  userIsCreator() {
    return this.currentDataService.userLogged?._id === this.deck.creator?._id;
  }

  setRating() {
    const dialogRef = this.dialog.open(DeckRatingDialog, {
      width: '30vw',
      height: 'auto',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container',
      data: this.userDeckRating
    });

    dialogRef.afterClosed().subscribe(
      {
        next: (userNewRating) => {
          if (userNewRating == undefined) {
            console.log("cancel");
            return;
          }

          if (userNewRating === -1)
            this.deleteUserRating();
          else {
            if (this.userDeckRating == undefined) {
              this.createUserRating(userNewRating);
            } else {
              this.updateUserRating(userNewRating);
            }
            this.userDeckRating = userNewRating;
          }
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  deleteUserRating() {
    this.deckService.deleteUserDeckRating(this.deck._id!).subscribe(
      {
        next: (response) => {
          this.setEndpointAverageRating(response.body);
          this.userDeckRating = undefined;
        },
        error: error => console.log(error)
      }
    );
  }

  createUserRating(userNewRating: number) {
    this.deckService.createUserDeckRating(this.deck._id!, userNewRating).subscribe(
      {
        next: (response) => {
          this.setEndpointAverageRating(response.body);
          // this.deckAverageRating = Math.floor(response.body / 2);
          // if (response.body % 2 != 0) this.isHalfStar = true;
          // this.emptyStars = this.STAR_NUMBER - this.deckAverageRating + (this.isHalfStar ? 1 : 0);
        },
        error: error => console.log(error)
      }
    );
  }

  updateUserRating(userNewRating: number) {
    this.deckService.updateUserDeckRating(this.deck._id!, userNewRating).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.setEndpointAverageRating(response.body);
        },
        error: error => console.log(error)
      }
    );
  }

  setEndpointAverageRating(rating: number) {
    this.deckAverageRating = Math.floor(rating / 2);
    if (rating % 2 != 0) this.isHalfStar = true;
    this.emptyStars = this.STAR_NUMBER - this.deckAverageRating - (this.isHalfStar ? 1 : 0);
  }

  existTrainingCards() {
    return this.currentDataService.allCardsTrainings != undefined && this.currentDataService.allCardsTrainings.length > 0;
  }

  deleteDeckTraining() {
    this.deleteDeckTrainingEmitter.emit();
  }

  restartDeckTraining() {
    this.restartDeckTrainingEmitter.emit();
  }
}
