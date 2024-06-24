import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserComponent} from "./user/user.component";
import {DeckComponent} from "../deck-list/deck/deck.component";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf,
    UserComponent,
    DeckComponent,
    NgIf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  @Input() userList!: User[];

}
