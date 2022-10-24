import { TestBed } from '@angular/core/testing';

import { CrudSensorExternoService } from './crud-sensor-externo.service';

describe('CrudSensorExternoService', () => {
  let service: CrudSensorExternoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSensorExternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
