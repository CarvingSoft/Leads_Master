import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFollowupComponent } from './open-followup.component';

describe('OpenFollowupComponent', () => {
  let component: OpenFollowupComponent;
  let fixture: ComponentFixture<OpenFollowupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenFollowupComponent]
    });
    fixture = TestBed.createComponent(OpenFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
