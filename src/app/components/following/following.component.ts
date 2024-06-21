import { Component } from '@angular/core';
import {DeckListComponent} from "../deck-list/deck-list.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";
import {UserListComponent} from "../user-list/user-list.component";
import {Deck} from "../../models/deck.model";
import {User} from "../../models/user.model";
import {DeckService} from "../../core/deck.service";
import {UserService} from "../../core/user.service";
import {CurrentDataService} from "../../core/local/current-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [
    DeckListComponent,
    MatTab,
    MatTabGroup,
    RecommendedUserListComponent,
    UserListComponent
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent {

  followedDecks: Deck[] = [];
  followedUsers: User[] = [];

  constructor(private deckService: DeckService, private userService: UserService,
              private currentDataService: CurrentDataService, private router: Router) {
    if (!this.currentDataService.userLogged?._id) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
      return;
    }

    this.getFollowedDecks();
    this.getFollowedUsers();
  }

  getFollowedDecks() {
    this.deckService.getUserFollowedDecks(this.currentDataService.userLogged!._id!).subscribe(
      {
        next: response => {
          console.log(response);
          this.followedDecks = response.body.followedDecks;
        },
        error: error => console.log(error)
      }
    );
  }

  getFollowedUsers() {
    this.userService.getUserFollowedUsers(this.currentDataService.userLogged!._id!).subscribe(
      {
        next: response => {
          console.log(response);
          this.followedUsers = response.body.followedUsers;
        },
        error: error => console.log(error)
      }
    );
  }

}
