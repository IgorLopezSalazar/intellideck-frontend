import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TopicService} from "../../../core/topic.service";
import {Topic} from "../../../models/topic.model";
import {TagService} from "../../../core/tag.service";
import {Tag} from "../../../models/tag.model";
import {MatChipsModule} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {DeckFilters} from "../../../models/deckFilters.model";
import {RouterLink} from "@angular/router";
import {UserFilters} from "../../../models/userFilters.model";

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
    MatDialogModule,
    MatLabel,
    MatTooltip,
    MatSlideToggle,
    MatSelect,
    NgForOf,
    MatAutocompleteModule,
    MatChipsModule,
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
  toolTipText: string = 'Si se ha rellenado algún campo en la búsqueda de mazos, se tomará este campo como el creador del mazo';

  deckFilters: DeckFilters = new DeckFilters();
  userFilters: UserFilters = new UserFilters();

  topicList: Topic[] = [];
  allTagsList: Tag[] = [];
  filteredTags: Tag[] = [];

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
          this.allTagsList = response.status == 200 ? response.body.map((tag: any) => new Tag(tag.name)) : [];
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
    console.log(this.deckFilters);
    console.log(this.userFilters);
    if (!this.deckFilters.isEmpty())
      this.deckFilters.creator = this.userFilters.username;

    if (this.deckFilters.minDeckRating === undefined || (this.deckFilters.minDeckRating! >= 0 && this.deckFilters.minDeckRating! <= 5))
      this.dialogRef.close({ deckFilters: this.deckFilters, userFilters: this.userFilters });
  }

  checkMinDeckRating() {
    if (!this.deckFilters.minDeckRating) return;
    if (this.deckFilters.minDeckRating % 0.5 != 0) {
      this.deckFilters.minDeckRating = Math.round(this.deckFilters.minDeckRating * 2) / 2;
    }
  }
}
