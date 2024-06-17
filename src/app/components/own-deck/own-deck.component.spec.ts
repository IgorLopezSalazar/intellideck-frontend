import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDeckComponent } from './own-deck.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {Deck} from "../../models/deck.model";
import {Topic} from "../../models/topic.model";
import {User} from "../../models/user.model";
import {CurrentDataService} from "../../core/local/current-data.service";
import {CardTraining} from "../../models/card-training.model";
import {Backtrack, DeckTraining} from "../../models/deck-training.model";
import {Card, WhereImageEnum} from "../../models/card.model";

describe('OwnDeckComponent', () => {
  let component: OwnDeckComponent;
  let fixture: ComponentFixture<OwnDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnDeckComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    const currentDataService = TestBed.inject(CurrentDataService);
    spyOnProperty(currentDataService, 'deck', 'get').and
      .returnValues(new Deck("titulo", new Topic("123456789abcdef", "name")));
    fixture = TestBed.createComponent(OwnDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
