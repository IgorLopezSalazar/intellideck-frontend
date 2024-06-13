import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSearchDialogComponent } from './explore-search-dialog.component';

describe('ExploreSearchDialogComponent', () => {
  let component: ExploreSearchDialogComponent;
  let fixture: ComponentFixture<ExploreSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreSearchDialogComponent]
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
