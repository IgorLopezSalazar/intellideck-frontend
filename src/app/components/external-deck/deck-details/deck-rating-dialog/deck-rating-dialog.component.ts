import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-deck-rating-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    RouterLink,
    NgIf
  ],
  templateUrl: './deck-rating-dialog.component.html',
  styleUrl: './deck-rating-dialog.component.scss'
})
export class DeckRatingDialog {

  deckRating: number = 0;

  constructor(private dialogRef: MatDialogRef<DeckRatingDialog>, @Inject(MAT_DIALOG_DATA) public userDeckRating?: number) {
    if (userDeckRating) this.deckRating = userDeckRating;
  }

  close(cancel?: boolean) {
    if (cancel)
      this.dialogRef.close();

    if (this.deckRating >= 0 && this.deckRating <= 5 && this.deckRating % 0.5 == 0)
      this.dialogRef.close(this.deckRating);
    else {
      this.checkDeckRating();
      alert("¡Valor inválido! Por favor, introduce un valor entre 0 y 5 con incrementos de 0,5");
    }

  }

  checkDeckRating() {
    if (!this.deckRating) return;
    if (this.deckRating % 0.5 != 0)
      this.deckRating = Math.round(this.deckRating * 2) / 2;
  }

  deleteUserRating() {
    this.dialogRef.close(-1);
  }
}
