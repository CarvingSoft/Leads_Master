import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVicComponent } from './view-vic.component';

describe('ViewVicComponent', () => {
  let component: ViewVicComponent;
  let fixture: ComponentFixture<ViewVicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVicComponent]
    });
    fixture = TestBed.createComponent(ViewVicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
