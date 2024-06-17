import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {Card, WhereImageEnum} from "../../../models/card.model";

@Component({
  selector: 'app-create-card-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatError,
    NgIf,
    MatCheckbox,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon
  ],
  templateUrl: './create-card-dialog.component.html',
  styleUrl: './create-card-dialog.component.scss'
})
export class CreateCardDialog {

  @ViewChild('fileDropRef', {static: false}) fileDropRef!: ElementRef;

  addImageChecked: boolean = false;
  imageLocation: string = 'QUESTION';
  allowedExtensions: string[] = ['.jpg', '.jpeg', '.png'];
  fileDropText: string = "";
  formValid: boolean = true;
  errorText: string = '';
  card: Card;
  updateCard: boolean = false;
  createUpdateText: string = "Crear carta";

  constructor(private dialogRef: MatDialogRef<CreateCardDialog>, @Inject(MAT_DIALOG_DATA) public cardToUpdate?: Card) {
    dialogRef.disableClose = true;

    if (cardToUpdate) {
      this.card = new Card(
        this.cardToUpdate!.whereImage,
        this.cardToUpdate!.question,
        this.cardToUpdate!.answer,
        this.cardToUpdate!.deckId,
        this.cardToUpdate!.imageFile,
        this.cardToUpdate!.image,
        this.cardToUpdate!._id,
      );
      this.updateCard = true;
      this.createUpdateText = "Actualizar carta";

      if (this.card.whereImage != WhereImageEnum.NONE) {
        this.addImageChecked = true;
        this.imageLocation = this.card.whereImage.toString();
      }
      if (this.card.imageFile) this.fileDropText = this.card.imageFile.name;
      else if (this.card.image) this.fileDropText = this.card.image;
    } else {
      this.card = new Card(WhereImageEnum.NONE);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveCard(): void {
    if (!this.isFormValid()) {
      this.formValid = false;
      return;
    }

    if (this.addImageChecked) {
      this.card.whereImage = (this.imageLocation === 'ANSWER') ? WhereImageEnum.ANSWER : WhereImageEnum.QUESTION;
    } else {
      this.card.whereImage = WhereImageEnum.NONE;
      this.card.imageFile = undefined;
      this.card.image = '';
    }

    console.log(this.card);
    this.dialogRef.close(this.card);
  }

  isFormValid(): boolean {
    let isValid = true;

    if (this.addImageChecked) {
      if (!this.card.image && !this.card.imageFile) {
        isValid = false;
        this.errorText = "Hubo un error con la imagen.";
      } else if ((this.imageLocation === 'answer' && !this.card.question) ||
        (this.imageLocation === 'question' && !this.card.answer)) {
        isValid = false;
        this.errorText = "Es necesario rellenar el campo que no tiene imagen.";
      }
    } else if (!this.card.question || !this.card.answer) {
      isValid = false;
      this.errorText = "La pregunta y la respuesta son necesarios.";
    }

    return isValid;
  }

  triggerFileInput() {
    this.fileDropRef.nativeElement.click();
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    this.saveDeckImage(input.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.saveDeckImage(event.dataTransfer.files);
  }

  saveDeckImage(inputFiles: FileList | null) {
    if (inputFiles && inputFiles.length > 0 && inputFiles.length < 2) {
      const file = inputFiles[0];
      const fileExtension = this.getFileExtension(file.name);

      if (this.allowedExtensions.includes(fileExtension)) {
        this.fileDropText = file.name;
        this.card.imageFile = file;
      } else {
        this.fileDropText = 'Tipo de archivo no permitido.';
        alert('Tipo de archivo invalido. Por favor selecciona un archivo válido: "' + this.allowedExtensions.join('", "') + '"');
      }
    }
  }

  private getFileExtension(filename: string): string {
    return filename.slice(filename.lastIndexOf('.')).toLowerCase();
  }
}
