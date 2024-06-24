import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDeckComponent } from './external-deck.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Deck} from "../../models/deck.model";
import {Topic} from "../../models/topic.model";
import {User} from "../../models/user.model";

describe('ExternalDeckComponent', () => {
  let component: ExternalDeckComponent;
  let fixture: ComponentFixture<ExternalDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalDeckComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalDeckComponent);
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
