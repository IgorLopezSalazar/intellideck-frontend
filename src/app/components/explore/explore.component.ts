import { Component, ViewEncapsulation } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ExploreSearchDialogComponent} from "./explore-search-dialog/explore-search-dialog.component";
import {Card} from "../../models/card.model";
import {DeckService} from "../../core/deck.service";
import {Deck} from "../../models/deck.model";
import {User} from "../../models/user.model";
import {DeckListComponent} from "../deck-list/deck-list.component";
import {NgIf} from "@angular/common";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {Topic} from "../../models/topic.model";
import {DeckFilters} from "../../models/deckFilters.model";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {UserService} from "../../core/user.service";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    DeckListComponent,
    NgIf,
    RecommendedUserListComponent,
    MatTabsModule
  ],
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

  filteredDecks: Deck[] = [];
  filteredUsers: User[] = [];

  constructor(public dialog: MatDialog, private deckService: DeckService,
              private userService: UserService) {
    this.openExploreSearchDialog();
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
        next: (response: { deckFilters: DeckFilters, userFilters: any} ) => {
          if (response == undefined) {
            console.log("cancel");
            return
          }
          if (response.deckFilters !== undefined) console.log(response.deckFilters);
          if (response.userFilters !== undefined) console.log(response.userFilters);

          this.deckService.filterDecks(response.deckFilters).subscribe(
            {
              next: (filterResponse) => {
                if (filterResponse.body) {
                  this.filteredDecks = filterResponse.body.map(
                    (filterResponse: Deck[]) => this.filteredDecks = filterResponse
                  );
                }
              },
              error: (error: any) => {
                console.log(error);
              }
            }
          );

          this.userService.filterUsers(response.userFilters).subscribe(
            {
              next: (filterResponse) => {
                if (filterResponse.body) {
                  this.filteredUsers = filterResponse.body.map(
                    (filterResponse: User[]) => this.filteredUsers = filterResponse
                  );
                }
              },
              error: (error: any) => {
                console.log(error);
              }
            }
          );
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

}
