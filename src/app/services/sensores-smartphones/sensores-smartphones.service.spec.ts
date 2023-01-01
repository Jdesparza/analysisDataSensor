import { TestBed } from '@angular/core/testing';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { SensoresSmartphonesService } from './sensores-smartphones.service';

describe('SensoresSmartphonesService', () => {
  let service: SensoresSmartphonesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    })
    service = TestBed.inject(SensoresSmartphonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
