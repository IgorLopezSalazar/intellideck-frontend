import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDecksComponent } from './user-decks.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('UserDecksComponent', () => {
  let component: UserDecksComponent;
  let fixture: ComponentFixture<UserDecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDecksComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
