import { Component } from '@angular/core';
import {CardComponent} from "./card/card.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

}
