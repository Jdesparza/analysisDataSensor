import { TestBed } from '@angular/core/testing';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { CrudSensorExternoService } from './crud-sensor-externo.service';

describe('CrudSensorExternoService', () => {
  let service: CrudSensorExternoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    })
    service = TestBed.inject(CrudSensorExternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
