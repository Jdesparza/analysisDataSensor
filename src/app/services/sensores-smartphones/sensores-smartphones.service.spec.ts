import { TestBed } from '@angular/core/testing';

import { SensoresSmartphonesService } from './sensores-smartphones.service';

describe('SensoresSmartphonesService', () => {
  let service: SensoresSmartphonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensoresSmartphonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
