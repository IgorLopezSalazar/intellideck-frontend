import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSearchDialogComponent } from './explore-search-dialog.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatDialogRef} from "@angular/material/dialog";

describe('ExploreSearchDialogComponent', () => {
  let component: ExploreSearchDialogComponent;
  let fixture: ComponentFixture<ExploreSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreSearchDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: MatDialogRef, useValue: {}},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
