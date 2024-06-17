import {Component, Input} from '@angular/core';
import {MatChip, MatChipSet} from "@angular/material/chips";
import {Deck} from "../../../models/deck.model";
import {NgFor, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {CurrentDataService} from "../../../core/local/current-data.service";

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    NgIf,
    NgForOf,
    NgFor
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {

  @Input() deck!: Deck;

  constructor(private router: Router, private currentDataService: CurrentDataService) {
  }

  openDeck() {
    this.currentDataService.deck = this.deck;

    let url;
    if (this.currentDataService.userLogged?._id === this.deck.creator?._id &&
        !this.deck.isPublished){
      url = '/own-deck';
    }
    else
      url = '/deck';

    this.router.navigate([url]).then(() => {
      console.log('Navigation complete');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  openUser() {
    console.log("user");
  }
}
