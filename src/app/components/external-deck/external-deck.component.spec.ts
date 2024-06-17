import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDeckComponent } from './external-deck.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

// describe('ExternalDeckComponent', () => {
//   let component: ExternalDeckComponent;
//   let fixture: ComponentFixture<ExternalDeckComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ExternalDeckComponent],
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//         provideRouter([]),
//         provideAnimations()
//       ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(ExternalDeckComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
