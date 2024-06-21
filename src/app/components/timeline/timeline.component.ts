import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {DeckListComponent} from "../deck-list/deck-list.component";
import {Deck} from "../../models/deck.model";
import {DeckService} from "../../core/deck.service";
import {CardComponent} from "../card-list/card/card.component";
import {NgIf} from "@angular/common";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";
import {User} from "../../models/user.model";
import {UserService} from "../../core/user.service";
import {CurrentDataService} from "../../core/local/current-data.service";
import {AuthService} from "../../core/auth.service";

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
  userList: User[] = [];

  constructor(private deckService: DeckService, private userService: UserService,
              private currentDataService: CurrentDataService, private authService: AuthService) {
    this.getUserLogged();

    this.getStudySessionsDecksToday();
    this.getTimelineDecks(0);
    this.getRecommendedUsers();
  }

  getUserLogged() {
    if (!this.currentDataService.userLogged) {
      this.authService.getUserLogged().subscribe(
        {
          next: response => {
            this.currentDataService.userLogged = response.body;
          },
          error: (error: any) => console.log(error)
        }
      );
    }
  }

  getStudySessionsDecksToday() {
    this.deckService.getStudyDecksToday().subscribe(
      {
        next: response => {
          if (response.status == 200) {
            console.log("estaTime")
            console.log(response)
            this.studySessions = response.body.map(
              (response: Deck[]) => this.studySessions = response
            );
          }
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  getTimelineDecks(page: number) {
    this.deckService.getTimelineDecks(page).subscribe(
      {
        next: response => {
          this.exploreDecks = response.body.map(
            (response: Deck[]) => this.exploreDecks = response
          );
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  getRecommendedUsers() {
    this.userService.getRecommendedUsers().subscribe(
      {
        next: response => {
          this.userList = response.body;
        },
        error: (error: any) => console.log(error)
      }
    );
  }
}
