import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBaseComponent } from './delete-base.component';

describe('DeleteBaseComponent', () => {
  let component: DeleteBaseComponent;
  let fixture: ComponentFixture<DeleteBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBaseComponent]
    });
    fixture = TestBed.createComponent(DeleteBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
