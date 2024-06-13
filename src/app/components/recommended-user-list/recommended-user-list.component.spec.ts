import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedUserListComponent } from './recommended-user-list.component';

describe('RecommendedUserListComponent', () => {
  let component: RecommendedUserListComponent;
  let fixture: ComponentFixture<RecommendedUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
