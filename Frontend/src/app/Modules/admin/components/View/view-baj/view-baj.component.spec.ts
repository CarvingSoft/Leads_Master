import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBajComponent } from './view-baj.component';

describe('ViewBajComponent', () => {
  let component: ViewBajComponent;
  let fixture: ComponentFixture<ViewBajComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBajComponent]
    });
    fixture = TestBed.createComponent(ViewBajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
