import {Component, Input} from '@angular/core';
import {Card, WhereImageEnum} from "../../../models/card.model";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";

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
  protected readonly WhereImageEnum = WhereImageEnum;

  imageSrc: string | ArrayBuffer | null = null;

  constructor() {
  }

  ngOnChanges() {
    if (this.card) {
      this.loadImage();
    }
  }

  loadImage() {
    if (this.card.image) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.card.image);
    }
  }
}
