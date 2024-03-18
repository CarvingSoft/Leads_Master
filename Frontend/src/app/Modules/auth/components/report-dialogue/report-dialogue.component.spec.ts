import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDialogueComponent } from './report-dialogue.component';

describe('ReportDialogueComponent', () => {
  let component: ReportDialogueComponent;
  let fixture: ComponentFixture<ReportDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDialogueComponent]
    });
    fixture = TestBed.createComponent(ReportDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
