import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckRatingDialog } from './deck-rating-dialog.component';

describe('DeckRatingDialogComponent', () => {
  let component: DeckRatingDialog;
  let fixture: ComponentFixture<DeckRatingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckRatingDialog]
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
