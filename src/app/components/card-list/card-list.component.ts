import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {MatIcon} from "@angular/material/icon";
import {CreateCardDialog} from "./create-card-dialog/create-card-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Card} from "../../models/card.model";
import {NgFor, NgIf} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {CardTraining} from "../../models/card-training.model";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon,
    NgFor,
    NgIf
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  @Input() externalDeckCard?: boolean;
  @Output() viewCardEvent = new EventEmitter<{index: number, isShown: boolean}>();

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
          card.isShown
        );
        this.cardList.push(newCard); // Add the new card to the destination array
      });
    }
    else {
      this.cardList = [];
    }
  }
  private eventsSubscription?: Subscription;
  @Input() events?: Observable<Card[]>;

  ngOnInit(){
    this.eventsSubscription = this.events!.subscribe(
      (cards: Card[]) => {
        this.cardList = cards;
      }
    );
  }

  ngOnDestroy() {
    if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
  }

  constructor(public dialog: MatDialog) {
  }

  viewCard({ index, isShown }: { index: number; isShown: boolean }) {
    //this.cardList.splice(cardIndex, 1);
    console.log("view" + index);
    this.viewCardEvent.emit({index: index, isShown: isShown});
    // let card = this.cardList.at(cardIndex);
    // if (card) {
    //
    // }
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
