import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

// describe('CardService', () => {
//   let service: CardService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//         provideRouter([]),
//         provideAnimations()
//       ]});
//     service = TestBed.inject(CardService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
