import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCustomerComponent } from './open-customer.component';

describe('OpenCustomerComponent', () => {
  let component: OpenCustomerComponent;
  let fixture: ComponentFixture<OpenCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenCustomerComponent]
    });
    fixture = TestBed.createComponent(OpenCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
