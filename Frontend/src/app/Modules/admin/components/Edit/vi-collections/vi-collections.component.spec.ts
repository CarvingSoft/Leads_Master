import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViCollectionsComponent } from './vi-collections.component';

describe('ViCollectionsComponent', () => {
  let component: ViCollectionsComponent;
  let fixture: ComponentFixture<ViCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViCollectionsComponent]
    });
    fixture = TestBed.createComponent(ViCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
