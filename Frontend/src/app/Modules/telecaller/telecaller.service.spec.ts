import { TestBed } from '@angular/core/testing';

import { TelecallerService } from './telecaller.service';

describe('TelecallerService', () => {
  let service: TelecallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelecallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
