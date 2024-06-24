import { Component } from '@angular/core';
import {FollowingComponent} from "../following/following.component";
import {DeckListComponent} from "../deck-list/deck-list.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {UserListComponent} from "../user-list/user-list.component";
import {Deck} from "../../models/deck.model";
import {User} from "../../models/user.model";
import {CurrentDataService} from "../../core/local/current-data.service";
import {DeckService} from "../../core/deck.service";
import {UserService} from "../../core/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FollowingComponent,
    DeckListComponent,
    MatTab,
    MatTabGroup,
    UserListComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  followedDecks: Deck[] = [];
  followedUsers: User[] = [];
  followerUsers: User[] = [];
  userDecks: Deck[] = [];
  user!: User;

  constructor(private deckService: DeckService, private userService: UserService,
              private currentDataService: CurrentDataService, private router: Router) {
    if (!this.currentDataService.selectedUser?._id) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error:', error);
      });
      return;
    }

    this.user = this.currentDataService.selectedUser;

    this.getFollowedUsers();
    this.getFollowerUsers();
    this.getFollowedDecks();
    this.getUserDecks();
  }

  getUserDecks() {
    this.deckService.getUserDecks(this.user._id!).subscribe(
      {
        next: response => {
          console.log(response);
          if (response.status == 200) {
            this.userDecks = response.body;
          }
        },
        error: error => console.log(error)
      }
    );
  }

  getFollowedDecks() {
    this.deckService.getUserFollowedDecks(this.currentDataService.selectedUser!._id!).subscribe(
      {
        next: response => {
          console.log(response);
          if (response.status == 200) {
            this.followedDecks = response.body.followedDecks;
          }
        },
        error: error => console.log(error)
      }
    );
  }

  getFollowedUsers() {
    this.userService.getUserFollowedUsers(this.currentDataService.selectedUser!._id!).subscribe(
      {
        next: response => {
          console.log(response);
          if (response.status == 200) {
            this.followedUsers = response.body.followedUsers;
          }
        },
        error: error => console.log(error)
      }
    );
  }

  getFollowerUsers() {
    this.userService.getUserFollowerUsers(this.currentDataService.selectedUser!._id!).subscribe(
      {
        next: response => {
          console.log(response);
          if (response.status == 200) {
            this.followedUsers = response.body.followedUsers;
          }
        },
        error: error => console.log(error)
      }
    );
  }
}
