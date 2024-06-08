import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardDialog } from './create-card-dialog.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Card, WhereImageEnum} from "../../../models/card.model";

describe('CreateCardDialog', () => {
  let component: CreateCardDialog;
  let fixture: ComponentFixture<CreateCardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCardDialog],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: new Card(WhereImageEnum.NONE)},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
