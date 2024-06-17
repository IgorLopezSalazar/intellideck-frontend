import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TopicService} from "../../../core/topic.service";
import {Topic} from "../../../models/topic.model";
import {TagService} from "../../../core/tag.service";
import {Tag} from "../../../models/tag.model";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {DeckFilters} from "../../../models/deckFilters.model";
import {DeckService} from "../../../core/deck.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-explore-search-dialog',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [
    FormsModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatLabel,
    MatInput,
    MatTooltip,
    MatSlideToggle,
    MatOption,
    MatSelect,
    NgForOf,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatIcon,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './explore-search-dialog.component.html',
  styleUrl: './explore-search-dialog.component.scss'
})
export class ExploreSearchDialogComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  toolTipText: string = 'Si se ha rellenado algún campo en la búsqueda de mazos, se tomará este campo como el creador del mazo';

  username: string = '';
  onlyFollowingUsers: boolean = false;
  onlyFollowerUsers: boolean = false;

  deckFilters: DeckFilters = new DeckFilters();

  topicList: Topic[] = [];
  allTagsList: Tag[] = [];
  filteredTags: Tag[] = [];
  currentTag: string = '';

  constructor(private dialogRef: MatDialogRef<ExploreSearchDialogComponent>,
              private topicService: TopicService, private tagService: TagService) {
    this.dialogRef.disableClose = true;
    this.getAllTopics();
    this.getAllTags();
  }

  getAllTopics() {
    this.topicService.getTopics().subscribe(
      {
        next: (response: any) => {
          this.topicList = response.body.map((topic: any) => new Topic(topic._id, topic.name));
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  getAllTags() {
    this.tagService.getTags().subscribe(
      {
        next: (response: any) => {
          this.allTagsList = response.body.map((tag: any) => new Tag(tag.name));
          this.filteredTags = this.allTagsList;
        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  autoCompleteTagSelected(event: MatAutocompleteSelectedEvent) {
    const selectedTag = this.allTagsList.find(tag => tag.name === event.option.viewValue);
    if (selectedTag) {
      this.deckFilters.tag = selectedTag.name;
    }
  }

  filter(value: string): void {
    const filterValue = value.toLowerCase();

    this.filteredTags = this.allTagsList.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

  cancel(): void {
    this.dialogRef.close();
  }

  search(): void {
    console.log(this.username);
    console.log(this.onlyFollowingUsers);
    console.log(this.onlyFollowerUsers);
    console.log(this.deckFilters);
    this.deckFilters.creator = this.username;

    this.dialogRef.close({ deckFilters: this.deckFilters, userFilters: 1 });
  }

  checkMinDeckRating() {
    if (!this.deckFilters.minDeckRating) return;
    if (this.deckFilters.minDeckRating % 0.5 != 0) {
      this.deckFilters.minDeckRating = Math.round(this.deckFilters.minDeckRating * 2) / 2;
    }
  }
}
