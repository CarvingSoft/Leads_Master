import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViSalesComponent } from './vi-sales.component';

describe('ViSalesComponent', () => {
  let component: ViSalesComponent;
  let fixture: ComponentFixture<ViSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViSalesComponent]
    });
    fixture = TestBed.createComponent(ViSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
