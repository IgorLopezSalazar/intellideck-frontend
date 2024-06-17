import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDetailsComponent } from './deck-details.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Deck} from "../../../models/deck.model";
import {Topic} from "../../../models/topic.model";
import {User} from "../../../models/user.model";

describe('DeckDetailsComponent', () => {
  let component: DeckDetailsComponent;
  let fixture: ComponentFixture<DeckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckDetailsComponent);
    component = fixture.componentInstance;
    let deck = new Deck("titulo", new Topic("123456789abcdef", "name"));
    deck.creator = new User("Test", "Test", "Test@Test.com", "Test", "12345678aA@", "USER");
    component.deck = deck;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
