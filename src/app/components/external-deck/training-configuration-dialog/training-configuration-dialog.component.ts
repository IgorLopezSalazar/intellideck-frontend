import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {Backtrack} from "../../../models/deck-training.model";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-training-configuration-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    MatButton
  ],
  templateUrl: './training-configuration-dialog.component.html',
  styleUrl: './training-configuration-dialog.component.scss'
})
export class TrainingConfigurationDialog {

  protected readonly Backtrack = Backtrack;

  backtrack: Backtrack = Backtrack.BACKTRACK_FIRST;
  boxNumber: number = 7;

  constructor(private dialogRef: MatDialogRef<TrainingConfigurationDialog>,) {
  }

  close(cancel?: boolean) {
    if (cancel)
      this.dialogRef.close();

    if (this.boxNumber >= 1 && this.boxNumber % 1 == 0)
      this.dialogRef.close({backtrack: this.backtrack, boxNumber: this.boxNumber});
    else
      alert("¡Valor inválido! Por favor, introduce un valor entero mayor que 0.");
  }
}
