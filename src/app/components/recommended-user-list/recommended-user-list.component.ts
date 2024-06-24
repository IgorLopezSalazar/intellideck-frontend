import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {CardComponent} from "../card-list/card/card.component";
import {NgForOf} from "@angular/common";
import {UserComponent} from "../user-list/user/user.component";

@Component({
  selector: 'app-recommended-user-list',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    UserComponent
  ],
  templateUrl: './recommended-user-list.component.html',
  styleUrl: './recommended-user-list.component.scss'
})
export class RecommendedUserListComponent {

  @Input() userList: User[] = [];

  constructor() {
  }

}
