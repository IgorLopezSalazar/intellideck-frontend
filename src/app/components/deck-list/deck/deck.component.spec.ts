import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Deck} from "../../../models/deck.model";
import {Topic} from "../../../models/topic.model";

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    component.deck = new Deck("titulo", new Topic("123456789abcdef", "name"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
