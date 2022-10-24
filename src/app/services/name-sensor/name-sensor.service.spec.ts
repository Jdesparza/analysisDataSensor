import { TestBed } from '@angular/core/testing';

import { NameSensorService } from './name-sensor.service';

describe('NameSensorService', () => {
  let service: NameSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
