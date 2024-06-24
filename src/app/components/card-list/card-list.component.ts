import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {MatIcon} from "@angular/material/icon";
import {CreateCardDialog} from "./create-card-dialog/create-card-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Card} from "../../models/card.model";
import {NgFor, NgIf} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {CardService} from "../../core/card.service";

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
          card.deck,
          card.imageFile,
          card.image,
          card.isShown
        );
        if (card._id) newCard._id = card._id;

        this.cardList.push(newCard);
      });
    }
    else {
      this.cardList = [];
    }
  }
  private eventsSubscription?: Subscription;
  @Input() events?: Observable<Card[]>;

  ngOnInit(){
    if (this.events) {
      this.eventsSubscription = this.events.subscribe(
        (cards: Card[]) => {
          this.cardList = cards;
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
  }

  constructor(public dialog: MatDialog, private cardService: CardService) {
  }

  viewCard({ index, isShown }: { index: number; isShown: boolean }) {
    console.log("view" + index);
    this.viewCardEvent.emit({index: index, isShown: isShown});
  }

  deleteCard(cardIndex: number) {
    console.log(this.cardList.at(cardIndex))
    if (this.cardList.at(cardIndex)?._id && this.cardList.at(cardIndex)?.deck) {
      this.cardService.deleteCard(this.cardList.at(cardIndex)!.deck!, this.cardList.at(cardIndex)!._id!).subscribe(
        {
          next: response => console.log(response),
          error: error => console.log(error)
        }
      );
    }

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
