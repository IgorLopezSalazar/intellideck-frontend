import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUnofficialTrainingDialog } from './start-unofficial-training-dialog.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatDialogRef} from "@angular/material/dialog";

describe('StartUnofficialTrainingDialogComponent', () => {
  let component: StartUnofficialTrainingDialog;
  let fixture: ComponentFixture<StartUnofficialTrainingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartUnofficialTrainingDialog],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: MatDialogRef, useValue: {}},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartUnofficialTrainingDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
