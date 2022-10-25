import { TestBed } from '@angular/core/testing';

import { ErrorRateService } from './error-rate-model.service';

describe('ErrorRateService', () => {
  let service: ErrorRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
