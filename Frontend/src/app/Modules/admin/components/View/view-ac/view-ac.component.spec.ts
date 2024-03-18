import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcComponent } from './view-ac.component';

describe('ViewAcComponent', () => {
  let component: ViewAcComponent;
  let fixture: ComponentFixture<ViewAcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAcComponent]
    });
    fixture = TestBed.createComponent(ViewAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
