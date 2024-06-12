import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {DeckListComponent} from "../deck-list/deck-list.component";
import {Deck} from "../../models/deck.model";
import {DeckService} from "../../core/deck.service";
import {Topic} from "../../models/topic.model";
import {CardComponent} from "../card-list/card/card.component";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    MatChipSet,
    MatChip,
    DeckListComponent,
    CardComponent,
    NgIf,
    RecommendedUserListComponent
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  studySessions: Deck[] = [];
  exploreDecks: Deck[] = [];

  constructor(private deckService: DeckService) {
    this.getTimelineDecks(0);
  }

  getTimelineDecks(page: number) {
    this.deckService.getTimelineDecks(page).subscribe(
      {
        next: response => {
          this.exploreDecks = response.body.map(
            (response: Deck[]) => this.exploreDecks = response
          );
          console.log(response.body);
          console.log(this.exploreDecks);
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  //
  // private mapToDeck(item: any): Deck {
  //   const deck: Deck = new Deck(item.title, item.topic);
  //   deck.id = item.id;
  //   deck.description = item.description;
  //   deck.image = item.image;
  //
  //   const creator: User = new User(
  //     item.creator.name,
  //     item.creator.surname,
  //     item.creator.email,
  //     item.creator.username,
  //     item.creator.password,
  //     item.creator.role
  //   );
  //   creator.profilePicture = item.creator.profilePicture;
  //   deck.creator = creator;
  //
  //   console.dir(deck)
  //
  //   return deck;
  // }

}
