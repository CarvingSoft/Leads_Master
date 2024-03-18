import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAsComponent } from './view-as.component';

describe('ViewAsComponent', () => {
  let component: ViewAsComponent;
  let fixture: ComponentFixture<ViewAsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAsComponent]
    });
    fixture = TestBed.createComponent(ViewAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
