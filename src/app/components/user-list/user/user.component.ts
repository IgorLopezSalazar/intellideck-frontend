import {Component, Input} from '@angular/core';
import {User} from "../../../models/user.model";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  @Input() user!: User;

  constructor() {

  }


}
