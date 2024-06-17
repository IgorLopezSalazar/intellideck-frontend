import { TestBed } from '@angular/core/testing';

import { CardTrainingService } from './card-training.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('CardTrainingService', () => {
  let service: CardTrainingService;

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
    service = TestBed.inject(CardTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
