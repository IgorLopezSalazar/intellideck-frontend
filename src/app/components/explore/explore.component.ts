import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ExploreSearchDialogComponent} from "./explore-search-dialog/explore-search-dialog.component";
import {DeckService} from "../../core/deck.service";
import {Deck} from "../../models/deck.model";
import {User} from "../../models/user.model";
import {DeckListComponent} from "../deck-list/deck-list.component";
import {NgIf} from "@angular/common";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {DeckFilters} from "../../models/deckFilters.model";
import {UserService} from "../../core/user.service";
import {UserListComponent} from "../user-list/user-list.component";
import {UserFilters} from "../../models/userFilters.model";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    DeckListComponent,
    NgIf,
    RecommendedUserListComponent,
    MatTabsModule,
    UserListComponent
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

  filteredDecks: Deck[] = [];
  filteredUsers: User[] = [];
  recommendedUserList: User[] = []
  selectedTab: number = 0;

  constructor(public dialog: MatDialog, private deckService: DeckService,
              private userService: UserService) {
    this.openExploreSearchDialog();
    this.getRecommendedUsers();
  }

  getRecommendedUsers() {
    this.userService.getRecommendedUsers().subscribe(
      {
        next: response => {
          this.recommendedUserList = response.body;
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  openExploreSearchDialog() {
    const dialogRef = this.dialog.open(ExploreSearchDialogComponent, {
      width: '60vw',
      height: 'auto',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(
      {
        next: (response: { deckFilters: DeckFilters, userFilters: UserFilters} ) => {
          if (response == undefined) {
            console.log("cancel");
            return;
          }

          this.filterDecks(response.deckFilters);
          this.filterUsers(response.userFilters);

          if (response.deckFilters.isEmpty()) this.selectedTab = 1;
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  filterDecks(deckFilters: DeckFilters) {
    this.deckService.filterDecks(deckFilters).subscribe(
      {
        next: (filterResponse) => {
          if (filterResponse.body) {
            this.filteredDecks = filterResponse.body.map(
              (filterResponse: Deck[]) => this.filteredDecks = filterResponse
            );
          }
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  filterUsers(userFilters: UserFilters) {
    this.userService.filterUsers(userFilters).subscribe(
      {
        next: (filterResponse) => {
          if (filterResponse.body) {
            this.filteredUsers = filterResponse.body.map(
              (filterResponse: User[]) => this.filteredUsers = filterResponse
            );
          }
        },
        error: (error: any) => console.log(error)
      }
    );
  }

}
