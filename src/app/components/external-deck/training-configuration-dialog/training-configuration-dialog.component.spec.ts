import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingConfigurationDialog } from './training-configuration-dialog.component';

describe('TrainingConfigurationDialogComponent', () => {
  let component: TrainingConfigurationDialog;
  let fixture: ComponentFixture<TrainingConfigurationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingConfigurationDialog]
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
