import {Component, EventEmitter, Output} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {MatIcon} from "@angular/material/icon";
import {CreateCardDialog} from "./create-card-dialog/create-card-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Card} from "../../models/card.model";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon,
    NgFor
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  @Output() cardListEmitter = new EventEmitter<any>();

  cardList: Card[] = [];

  constructor(public dialog: MatDialog) {
  }

  openCreateCardDialog() {
    const dialogRef = this.dialog.open(CreateCardDialog, {
      width: '40vw',
      maxWidth: '600px',
      height: 'auto',
      maxHeight: '70vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((card: Card) => {
      if (card !== undefined) {
        console.log('The dialog was closed: ' + card);
        console.dir(card);
        this.cardList.push(card);
      } else {
        console.log('The dialog was canceled');
      }

    });
  }

}
