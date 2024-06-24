import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckRatingDialog } from './deck-rating-dialog.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('DeckRatingDialogComponent', () => {
  let component: DeckRatingDialog;
  let fixture: ComponentFixture<DeckRatingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckRatingDialog],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: 7}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckRatingDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
