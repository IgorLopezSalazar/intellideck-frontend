import { Component } from '@angular/core';
import {DeckListComponent} from "../deck-list/deck-list.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";
import {Deck} from "../../models/deck.model";
import {DeckService} from "../../core/deck.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-decks',
  standalone: true,
  imports: [
    DeckListComponent,
    MatTab,
    MatTabGroup,
    RecommendedUserListComponent,
    NgIf
  ],
  templateUrl: './user-decks.component.html',
  styleUrl: './user-decks.component.scss'
})
export class UserDecksComponent {

  userDeckList: Deck[] = [];

  constructor(private deckService: DeckService) {
    this.getUserDeckList();
  }

  getUserDeckList() {
    this.deckService.getUserDeckList().subscribe(
      {
        next: response => {
          console.log(response)
          this.userDeckList = response.body;
        },
        error: error => console.log(error)
      }
    );
  }

}
