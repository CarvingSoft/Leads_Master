import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsianetSalesComponent } from './asianet-sales.component';

describe('AsianetSalesComponent', () => {
  let component: AsianetSalesComponent;
  let fixture: ComponentFixture<AsianetSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsianetSalesComponent]
    });
    fixture = TestBed.createComponent(AsianetSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
