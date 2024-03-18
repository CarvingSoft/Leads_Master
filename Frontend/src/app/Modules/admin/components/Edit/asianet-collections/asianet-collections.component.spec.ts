import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsianetCollectionsComponent } from './asianet-collections.component';

describe('AsianetCollectionsComponent', () => {
  let component: AsianetCollectionsComponent;
  let fixture: ComponentFixture<AsianetCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsianetCollectionsComponent]
    });
    fixture = TestBed.createComponent(AsianetCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
