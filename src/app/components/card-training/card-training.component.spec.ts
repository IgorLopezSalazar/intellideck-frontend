import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardTrainingComponent} from './card-training.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {CurrentDataService} from "../../core/local/current-data.service";
import {CardTraining} from "../../models/card-training.model";
import {Backtrack, DeckTraining} from "../../models/deck-training.model";
import {Card, WhereImageEnum} from "../../models/card.model";

describe('CardTrainingComponent', () => {
  let component: CardTrainingComponent;
  let fixture: ComponentFixture<CardTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTrainingComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    const currentDataService = TestBed.inject(CurrentDataService);
    const cardTrainingList = [new CardTraining(true, 2,
      new DeckTraining(7, Backtrack.BACKTRACK_FIRST, "123456789abcdef"), new Card(WhereImageEnum.NONE))];
    spyOnProperty(currentDataService, 'cardsTraining', 'get').and.returnValues(cardTrainingList,
      cardTrainingList, cardTrainingList);
    fixture = TestBed.createComponent(CardTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
