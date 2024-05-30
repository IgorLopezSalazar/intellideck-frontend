import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDetailsFormComponent } from './deck-details-form.component';

describe('DeckDetailsFormComponent', () => {
  let component: DeckDetailsFormComponent;
  let fixture: ComponentFixture<DeckDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeckDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
