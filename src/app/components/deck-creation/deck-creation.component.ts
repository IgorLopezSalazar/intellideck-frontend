import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DeckService} from "../../core/deck.service";
import {Deck} from "../../models/deck.model";
import {NgIf} from "@angular/common";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {CardListComponent} from "../card-list/card-list.component";
import {TagService} from "../../core/tag.service";
import {ImagesService} from "../../core/images.service";

@Component({
  selector: 'app-deck-creation',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    MatIcon,
    MatButton,
    NgIf,
    MatError,
    DeckDetailsFormComponent,
    CardListComponent
  ],
  templateUrl: './deck-creation.component.html',
  styleUrl: './deck-creation.component.scss'
})
export class DeckCreationComponent {

  receivedDeck?: Deck;

  constructor(private deckService: DeckService, private tagService: TagService, private imagesService: ImagesService) {
  }

  handleDeckCreation(data: any) {
    this.receivedDeck = data;

    if (this.receivedDeck == undefined) {
      return;
    }

    const getTagsIdPromise = this.getDeckTagsId(this.receivedDeck);
    let secondPromise;
    if (this.receivedDeck.image){
      secondPromise = this.saveDeckImage(this.receivedDeck);
    }

    Promise.all([getTagsIdPromise, secondPromise]).then(
      ([deckWithTagsId, imagePath]) => {
        if (imagePath) {
          deckWithTagsId.imagePath = imagePath.body;
        }
        this.createDeck(deckWithTagsId);
      }
    );
  }

  createDeck(deck: Deck) {
    this.deckService.createDeck(deck).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  async getDeckTagsId(deck: Deck) {
    await Promise.all(
      deck.tags?.map(async tag => {
        const response = await this.tagService.getTag(tag).toPromise();
        tag.id = response.body._id;
      })
    );

    return deck;
  }

  async saveDeckImage(deck: Deck) {
    return await this.imagesService.postImage(deck.image!).toPromise();
  }
}
