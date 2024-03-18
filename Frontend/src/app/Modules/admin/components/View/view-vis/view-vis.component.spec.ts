import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisComponent } from './view-vis.component';

describe('ViewVisComponent', () => {
  let component: ViewVisComponent;
  let fixture: ComponentFixture<ViewVisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVisComponent]
    });
    fixture = TestBed.createComponent(ViewVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
