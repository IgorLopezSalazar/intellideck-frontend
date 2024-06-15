import { TestBed } from '@angular/core/testing';

import { CurrentDataService } from './current-data.service';

describe('CurrentDeckService', () => {
  let service: CurrentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
