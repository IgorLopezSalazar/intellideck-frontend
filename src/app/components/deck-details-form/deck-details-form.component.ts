import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Deck} from "../../models/deck.model";
import {MatOption, MatSelect} from "@angular/material/select";
import {TopicService} from "../../core/topic.service";
import {Topic} from "../../models/topic.model";
import {MatChipGrid, MatChipInputEvent, MatChipRow, MatChipsModule} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Tag} from "../../models/tag.model";
import {TagService} from "../../core/tag.service";
import { cloneDeep } from 'lodash';
import {lastValueFrom} from "rxjs";
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
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    NgClass,
    MatChipGrid,
    MatChipRow,
    MatChipsModule,
    MatAutocompleteTrigger,
    MatAutocomplete
  ],
  templateUrl: './deck-details-form.component.html',
  styleUrl: './deck-details-form.component.scss'
})
export class DeckDetailsFormComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() receivedDeck?: Deck;
  @Input() displayText: string = 'Crear mazo';
  @Input() createdDeck: boolean = false;
  @Output() deckEmitter = new EventEmitter<any>();

  @ViewChild('fileDropRef', { static: false }) fileDropRef!: ElementRef;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  allowedExtensions: string[] = ['.jpg', '.jpeg', '.png'];
  fileDropText: string = "";
  deckImage?: File;
  fieldMissing: boolean = false;

  selectedTopicIndex: number = -1;
  topicList: Topic[] = [];
  allTagsList: Tag[] = [];
  deckTags: Tag[] = [];
  filteredTags: Tag[] = [];
  currentTag: string = '';
  deck: Deck;

  constructor(private topicService: TopicService, private tagService: TagService) {
    this.deck = new Deck('', new Topic('', ''));
  }

  async ngOnInit() {
    const [allTopics, allTags] = await Promise.all([this.getAllTopics(), this.getAllTags()]);
    this.topicList = allTopics.body.map((topic: any) => new Topic(topic._id, topic.name));
    this.allTagsList = allTags.body.map((tag: any) => new Tag(tag.name));
    this.filteredTags = this.allTagsList;

    if (this.receivedDeck) {
      this.deck = cloneDeep(this.receivedDeck);
      this.selectedTopicIndex = this.topicList.findIndex(topic => topic.name === this.deck.topic.name && topic._id === this.deck.topic._id);
      this.deckTags = this.deck.tags;
      if (this.deck.image) this.fileDropText = this.deck.image;
    }
  }

  async getAllTopics() {
    return await lastValueFrom(this.topicService.getTopics());
  }

  async getAllTags() {
    return await lastValueFrom(this.tagService.getTags());
  }

  removeTag(tag: Tag) {
    const index = this.deckTags.indexOf(tag);

    if (index >= 0) {
      this.deckTags.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      let newTag = new Tag(value);
      this.deckTags.push(newTag);
    }

    event.chipInput.clear();
    this.tagInput.nativeElement.value = '';
    this.filter('');
  }

  autoCompleteTagSelected(event: MatAutocompleteSelectedEvent) {
    const selectedTag = this.allTagsList.find(tag => tag.name === event.option.viewValue);
    if (selectedTag) {
      this.deckTags.push(selectedTag);
      this.tagInput.nativeElement.value = '';
      this.filter('');
    }
  }

  filter(value: string): void {
    const filterValue = value.toLowerCase();

    this.filteredTags = this.allTagsList.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

  formSubmit(deckForm: NgForm, publish: boolean): void {
    if (!this.isFormValid(deckForm)) {
      return;
    }
    this.fieldMissing = false;

    const deck = this.populateDeck(deckForm);
    console.log(deck)
    this.deckEmitter.emit({deck: deck, publish: publish});
  }

  populateDeck(deckForm: NgForm): Deck {
    const deck = new Deck(deckForm.value.title, this.topicList[(this.selectedTopicIndex)]);
    deck.description = deckForm.value.description;
    deck.tags = this.deckTags;
    if (this.deckImage){
      deck.imageFile = this.deckImage;
    }

    return deck;
  }

  isFormValid(deckForm: NgForm): boolean {
    let isValid = true;

    if (!this.deck.title || this.selectedTopicIndex == -1) {
      deckForm.controls['topic'].setErrors({ 'required': true });
      this.fieldMissing = true;
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
      const fileExtension = this.getFileExtension(file.name);

      if (this.allowedExtensions.includes(fileExtension)) {
        this.fileDropText = file.name;
        this.deckImage = file;
      } else {
        this.fileDropText = 'Tipo de archivo no permitido.';
        alert('Tipo de archivo invalido. Por favor selecciona un archivo válido: "' + this.allowedExtensions.join('", "') + '"');
      }
    }
  }

  private getFileExtension(filename: string): string {
    return filename.slice(filename.lastIndexOf('.')).toLowerCase();
  }

  async publishDeck(deckForm: NgForm) {
    this.formSubmit(deckForm, true);

    console.log("publish")

  }
}
