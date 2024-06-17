import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDetailsFormComponent } from './deck-details-form.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {TopicService} from "../../core/topic.service";
import {TagService} from "../../core/tag.service";
import {Tag} from "../../models/tag.model";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Topic} from "../../models/topic.model";

describe('DeckDetailsFormComponent', () => {
  let component: DeckDetailsFormComponent;
  let fixture: ComponentFixture<DeckDetailsFormComponent>;

  const getFileList = (name: string) => {
    const dt = new DataTransfer();
    dt.items.add(new File([], name));
    return dt.files;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDetailsFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store topics', (done) => {
    const topicService = TestBed.inject(TopicService);
    spyOn(topicService, 'getTopics').and.returnValues(of([{
      _id: "123456789abcdefg",
      name: "Historia"
    }]));
    component.getAllTopics().then(data => {
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual("Historia");
      done();
    });
    fixture.detectChanges();
  });

  it('should store tags', (done) => {
    const tagService = TestBed.inject(TagService);
    spyOn(tagService, 'getTags').and.returnValues(of([{
      name: "Historia"
    }]));
    component.getAllTags().then(data => {
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual("Historia");
      done();
    });
    fixture.detectChanges();
  });

  it('should remove a tag', () => {
    let tag = new Tag("Historia");
    component.deckTags = [tag, new Tag("Mate")]
    component.removeTag(tag);
    fixture.detectChanges();
    expect(component.deckTags.length).toEqual(1);
    expect(component.deckTags[0].name).toEqual("Mate");
  });

  it('should not remove a tag', () => {
    component.deckTags = [new Tag("Historia"), new Tag("Mate")]
    component.removeTag(new Tag("Histo"));
    fixture.detectChanges();
    expect(component.deckTags.length).toEqual(2);
    expect(component.deckTags[0].name).toEqual("Historia");
    expect(component.deckTags[1].name).toEqual("Mate");
  });

  it('should filter tags', () => {
    component.allTagsList = [new Tag("Historia"), new Tag("Mate")]
    component.filter("H");
    fixture.detectChanges();
    expect(component.filteredTags.length).toEqual(1);
    expect(component.filteredTags[0].name).toEqual("Historia");
  });

  it('should add tag to deck tags', () => {
    let tag = new Tag("Historia");
    component.allTagsList = [tag, new Tag("Mate")]
    component.autoCompleteTagSelected({option: {
      viewValue: "Historia"
      }} as MatAutocompleteSelectedEvent);
    fixture.detectChanges();
    expect(component.deckTags.length).toEqual(1);
    expect(component.deckTags[0].name).toEqual("Historia");
  });

  it('should detect invalid form', () => {
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.fieldMissing).toBeTruthy();
  });

  it('should detect title missing', () => {
    let spy = spyOn(component.deckEmitter, 'emit');
    fixture.nativeElement.querySelector('input[name =title]').value = "Title";
    fixture.nativeElement.querySelector('input[name =title]').dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('mat-select[name =topic]').dispatchEvent(new Event('blur'));
    component.selectedTopicIndex = 0;
    component.topicList = [new Topic("123456789abcdefg", "Topic")];
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.fieldMissing).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('should store image for deck', () => {
    component.saveDeckImage(getFileList("image.png"));
    fixture.detectChanges();
    expect(component.deckImage).not.toEqual(undefined);
    expect(component.fileDropText).toEqual("image.png");
  });

  it('should detect image wrong extension', () => {
    component.saveDeckImage(getFileList("image.csv"));
    fixture.detectChanges();
    expect(component.deckImage).toEqual(undefined);
    expect(component.fileDropText).toEqual("Tipo de archivo no permitido.");
  });
});
