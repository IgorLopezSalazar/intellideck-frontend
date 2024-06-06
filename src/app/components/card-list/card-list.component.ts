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

  cardList: Card[] = [];

  constructor(public dialog: MatDialog) {
  }

  deleteCard(cardIndex: number) {
    this.cardList.splice(cardIndex, 1);
  }

  editCard(cardIndex: number) {
    this.openCreateCardDialog(this.cardList.at(cardIndex)).subscribe((card: Card) => {
      if (card !== undefined) {
        this.cardList[cardIndex] = card;
        console.log('The card was updated');
      } else {
        console.log('The dialog was canceled');
      }
    });
  }

  createCard() {
    this.openCreateCardDialog().subscribe((card: Card) => {
      if (card !== undefined) {
        this.cardList.push(card);
      } else {
        console.log('The dialog was canceled');
      }
    });
  }

  openCreateCardDialog(card?: Card) {
    const dialogRef = this.dialog.open(CreateCardDialog, {
      width: '40vw',
      maxWidth: '600px',
      height: 'auto',
      maxHeight: '70vh',
      panelClass: 'custom-dialog-container',
      data: card
    });

    return dialogRef.afterClosed();
  }

}
