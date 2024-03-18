import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBaseComponent } from './export-base.component';

describe('ExportBaseComponent', () => {
  let component: ExportBaseComponent;
  let fixture: ComponentFixture<ExportBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportBaseComponent]
    });
    fixture = TestBed.createComponent(ExportBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
