import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDeckComponent } from './external-deck.component';

describe('ExternalDeckComponent', () => {
  let component: ExternalDeckComponent;
  let fixture: ComponentFixture<ExternalDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalDeckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
