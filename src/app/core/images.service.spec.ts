import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

// describe('ImagesService', () => {
//   let service: ImagesService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//         provideRouter([]),
//         provideAnimations()
//       ]
//     });
//     service = TestBed.inject(ImagesService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
