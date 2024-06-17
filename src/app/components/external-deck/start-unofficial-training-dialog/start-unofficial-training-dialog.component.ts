import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-start-unofficial-training-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton
  ],
  templateUrl: './start-unofficial-training-dialog.component.html',
  styleUrl: './start-unofficial-training-dialog.component.scss'
})
export class StartUnofficialTrainingDialog {

  constructor(private dialogRef: MatDialogRef<StartUnofficialTrainingDialog>) {
  }

  close(continueTraining: boolean) {
    this.dialogRef.close(continueTraining);
  }
}
