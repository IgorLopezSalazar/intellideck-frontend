import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card, WhereImageEnum} from "../../../models/card.model";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() card!: Card;
  @Input() index!: number;
  @Input() viewTemp?: boolean;
  @Output() viewCardEvent = new EventEmitter<{index: number, isShown: boolean}>();
  @Output() editCardEvent = new EventEmitter<number>();
  @Output() deleteCardEvent = new EventEmitter<number>();
  @Input()
  set externalDeckCardInput(value: boolean | undefined) {
    if (value) {
      this.externalDeckCard = value;
    }
  }

  protected readonly WhereImageEnum = WhereImageEnum;

  imageSrc: string | ArrayBuffer | null = null;
  externalDeckCard: boolean = false;

  constructor() {
    console.log("view " + this.viewTemp);
  }

  viewCard() {
    this.card.isShown = !this.card.isShown;
    this.viewCardEvent.emit({index: this.index, isShown: this.card.isShown});
  }

  editCard() {
    this.editCardEvent.emit(this.index);
  }

  deleteCard() {
    this.deleteCardEvent.emit(this.index);
  }

  ngOnChanges() {
    if (this.card) {
      this.loadImage();
    }
    console.log(this.card)
    console.log("ngChange view " + this.viewTemp);
  }

  loadImage() {
    if (this.card.imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.card.imageFile);
    }
    else if (this.card.image) {
      this.imageSrc = this.card.image;
    }
  }
}
