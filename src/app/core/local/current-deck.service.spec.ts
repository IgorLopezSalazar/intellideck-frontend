import { TestBed } from '@angular/core/testing';

import { CurrentDeckService } from './current-deck.service';

describe('CurrentDeckService', () => {
  let service: CurrentDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
