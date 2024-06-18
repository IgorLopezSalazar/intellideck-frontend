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

  @Input() deck!: Deck;
  @Output() startTrainingEmitter = new EventEmitter<any>();
  isFollowingDeck: boolean = false;

  constructor(private currentDataService: CurrentDataService, private deckService: DeckService,
              private router: Router) {
  }

  ngOnChanges() {
    this.isFollowingDeck = this.checkIfFollowing();
    console.log(this.isFollowingDeck)
  }

  startTraining() {
    this.startTrainingEmitter.emit();
  }

  async followDeck() {
    try {
      const response = await lastValueFrom(this.deckService.updateDeckFollowStatus(this.deck._id!, !this.isFollowingDeck));
      this.currentDataService.userLogged = response.body;
      console.log(response)
    }
    catch (error: any) {
      console.log(error);
    }

    this.isFollowingDeck = this.checkIfFollowing();
  }

  checkIfFollowing(): boolean {
    console.log(this.currentDataService.userLogged?.followedDecks)
    if (this.currentDataService.userLogged?.followedDecks) {
      console.log(this.deck)
      return this.currentDataService.userLogged.followedDecks.some(followedDeck => followedDeck._id === this.deck._id );
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
    }
    catch (error: any) {
      console.log(error);
    }
  }
}
