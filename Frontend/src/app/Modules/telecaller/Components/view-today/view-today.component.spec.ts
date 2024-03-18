import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayComponent } from './view-today.component';

describe('ViewTodayComponent', () => {
  let component: ViewTodayComponent;
  let fixture: ComponentFixture<ViewTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTodayComponent]
    });
    fixture = TestBed.createComponent(ViewTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
