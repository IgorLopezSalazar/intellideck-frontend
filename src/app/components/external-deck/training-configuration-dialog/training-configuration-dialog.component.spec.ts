import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingConfigurationDialog } from './training-configuration-dialog.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatDialogRef} from "@angular/material/dialog";

describe('TrainingConfigurationDialogComponent', () => {
  let component: TrainingConfigurationDialog;
  let fixture: ComponentFixture<TrainingConfigurationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingConfigurationDialog],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingConfigurationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
