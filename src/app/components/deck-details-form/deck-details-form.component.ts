import {Component, ElementRef, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Deck} from "../../models/deck.model";
import {DeckService} from "../../core/deck.service";

@Component({
  selector: 'app-deck-details-form',
  standalone: true,
    imports: [
        CdkTextareaAutosize,
        FormsModule,
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        NgIf
    ],
  templateUrl: './deck-details-form.component.html',
  styleUrl: './deck-details-form.component.scss'
})
export class DeckDetailsFormComponent {

  @ViewChild('fileDropRef', { static: false }) fileDropRef!: ElementRef;

  fileDropText: string = "";
  deckImage: File | null = null;
  titleMissing: boolean = false;

  constructor(private deckService: DeckService) {

  }

  createDeck(deckForm: NgForm): void {
    if (!this.isFormValid(deckForm)) {
      return;
    }

    const deck = new Deck(deckForm.value.title,);

    this.deckService.createDeck(deck).subscribe(
      response => {
        console.log(response);
        this.titleMissing = false;
      },
      error => {
        console.log(error);
      });
  }

  isFormValid(deckForm: NgForm): boolean {
    let isValid = true;
    if (deckForm.controls['title'].getError('required') ||
      deckForm.controls['topic'].getError('required')) {
      this.titleMissing = true;
      isValid = false;
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
      this.fileDropText = file.name;
      this.deckImage = file;
    }
  }
}
