import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {CurrentDataService} from "../../core/local/current-data.service";
import {Backtrack, DeckTraining} from "../../models/deck-training.model";
import {CardTraining} from "../../models/card-training.model";
import {Card, WhereImageEnum} from "../../models/card.model";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        provideCharts(withDefaultRegisterables())
      ],
    })
    .compileComponents();

    const currentDataService = TestBed.inject(CurrentDataService);
    const cardTrainingList = [new CardTraining(true, 2,
      new DeckTraining(7, Backtrack.BACKTRACK_FIRST, "123456789abcdef"), new Card(WhereImageEnum.NONE))];
    spyOnProperty(currentDataService, 'cardsTraining', 'get').and.returnValues(cardTrainingList);
    spyOnProperty(currentDataService, 'deckTraining', 'get').and
      .returnValues(new DeckTraining(7, Backtrack.BACKTRACK_FIRST, "123456789abcdef"),
        new DeckTraining(7, Backtrack.BACKTRACK_FIRST, "123456789abcdef"));
    spyOnProperty(currentDataService, 'completionTimeSeconds', 'get').and
      .returnValues(5, 5);
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
