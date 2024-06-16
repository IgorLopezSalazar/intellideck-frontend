import { Component } from '@angular/core';
import {DeckListComponent} from "../deck-list/deck-list.component";
import {NgIf} from "@angular/common";
import {RecommendedUserListComponent} from "../recommended-user-list/recommended-user-list.component";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    DeckListComponent,
    NgIf,
    RecommendedUserListComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

}
