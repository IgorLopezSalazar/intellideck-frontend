import { TestBed } from '@angular/core/testing';

import { DeckTrainingService } from './deck-training.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('DeckTrainingService', () => {
  let service: DeckTrainingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
      .compileComponents();
    service = TestBed.inject(DeckTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
