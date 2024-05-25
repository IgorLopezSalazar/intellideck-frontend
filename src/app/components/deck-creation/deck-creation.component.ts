import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatIcon} from "@angular/material/icon";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {MatButton} from "@angular/material/button";

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
    MatButton
  ],
  templateUrl: './deck-creation.component.html',
  styleUrl: './deck-creation.component.scss'
})
export class DeckCreationComponent {

  @ViewChild('fileDropRef', { static: false }) fileDropRef!: ElementRef;

  fileDropText: string = "";
  deckImage: File | null = null;

  constructor() {

  }

  createDeck(registerForm: NgForm): void {
    console.log("submit");
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
