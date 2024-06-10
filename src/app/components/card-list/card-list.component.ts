import {Component, Input} from '@angular/core';
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

  @Input() externalDeckCard?: boolean;

  cardList: Card[] = [];
  @Input()
  set cardListInput(value: Card[] | undefined) {
    if (value) {
      value.forEach(card => {
        const newCard = new Card(
          card.whereImage,
          card.question,
          card.answer,
          card.deckId,
          card.imageFile,
          card.image,
          card._id,
        );
        this.cardList.push(newCard); // Add the new card to the destination array
      });
    }
    else {
      this.cardList = [];
    }
  }

  constructor(public dialog: MatDialog) {
  }

  viewCard(cardIndex: number) {
    //this.cardList.splice(cardIndex, 1);
    console.log("view" + cardIndex)
  }

  deleteCard(cardIndex: number) {
    this.cardList.splice(cardIndex, 1);
  }

  editCard(cardIndex: number) {
    this.openCreateCardDialog(this.cardList.at(cardIndex)).subscribe(
      {
        next: (card: Card) => {
          if (card !== undefined) {
            this.cardList[cardIndex] = card;
            console.log('The card was updated');
          } else {
            console.log('The dialog was canceled');
          }
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  createCard() {
    this.openCreateCardDialog().subscribe(
      {
        next: (card: Card) => {
          if (card !== undefined) {
            this.cardList.push(card);
          } else {
            console.log('The dialog was canceled');
          }
        },
        error: (error: any) => { console.log(error) }
      }
    );
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
