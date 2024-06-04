import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {Deck} from "../../../models/deck.model";
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

  @ViewChild('fileDropRef', { static: false }) fileDropRef!: ElementRef;

  addImageChecked: boolean = false;
  imageLocation: string = 'question';
  allowedExtensions: string[] = ['.jpg', '.jpeg', '.png'];
  fileDropText: string = "";
  cardImage?: File;
  formValid: boolean = true;
  errorText: string = '';

  constructor(private dialogRef: MatDialogRef<CreateCardDialog>) {
    dialogRef.disableClose = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveCard(cardForm: NgForm): void {
    if (!this.isFormValid(cardForm)) {
      this.formValid = false;
      return;
    }

    let newCard = this.populateCard(cardForm);
    console.log(newCard);

    this.dialogRef.close(newCard);
  }

  populateCard(cardForm: NgForm): Card {
    let card: Card;
    const question = cardForm.value.question;
    const answer = cardForm.value.answer;

    if (this.addImageChecked && this.cardImage) {
      const imageLocation = (this.imageLocation === 'answer') ? WhereImageEnum.ANSWER : WhereImageEnum.QUESTION;
      card = new Card(imageLocation, question, answer);
      card.image = this.cardImage;
    } else {
      card = new Card(WhereImageEnum.NONE, question, answer);
    }

    return card;
  }

  isFormValid(cardForm: NgForm): boolean {
    let isValid = true;

    if (this.addImageChecked) {
      if (!this.cardImage) {
        isValid = false;
        this.errorText = "Hubo un error con la imagen.";
      }
      if ((this.imageLocation === 'answer' && !cardForm.value.question) ||
          (this.imageLocation === 'question' && !cardForm.value.answer)) {
        isValid = false;
        this.errorText = "Es necesario rellenar el campo que no tiene imagen.";
      }
    }
    else if (!cardForm.value.question || !cardForm.value.answer) {
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
        this.cardImage = file;
      } else {
        this.fileDropText = 'Tipo de archivo no permitido.';
        alert('Tipo de archivo invalido. Por favor selecciona un archivo válido: \"' + this.allowedExtensions.join('\", \"') + '\"');
      }
    }
  }

  private getFileExtension(filename: string): string {
    return filename.slice(filename.lastIndexOf('.')).toLowerCase();
  }
}
