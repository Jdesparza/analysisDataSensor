import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { HomeComponent } from './home.component';
import sensoresJson  from 'src/assets/json/sensores.json';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';
import { ErrorRateService } from 'src/app/services/error-rate-model/error-rate-model.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ HomeComponent ],
      providers: [
        SensoresSmartphonesService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Determinar que se guarden los sensores smartphone existentes', () => {
    component.modelosExists(sensoresJson);

    expect(component.listSenAcelerometro.length > 0).toBeTrue();
    expect(component.listSenBarometro.length > 0).toBeTrue();
    expect(component.listSenTermometro.length > 0).toBeTrue();
    expect(component.listSenCamara.length > 0).toBeTrue();
    expect(component.listSenGPS.length > 0).toBeTrue();
    expect(component.listSenMicrofono.length > 0).toBeTrue();
    expect(component.listSenGiroscopio.length > 0).toBeTrue();
    expect(component.listSenMagnetometro.length > 0).toBeTrue();
    expect(component.listSenLuz.length > 0).toBeTrue();
    expect(component.listSenPodometro.length > 0).toBeTrue();
    expect(component.listSenProximidad.length > 0).toBeTrue();
    expect(component.listSenRitmoCardiaco.length > 0).toBeTrue();
  });

  it('Determinar que se guarden los sensores externos existentes', () => {
    component.listSensoresExternos = sensoresExternosJson;

    expect(component.listSensoresExternos.length > 0).toBeTrue();
  });

  it('Cálculo error por metodos del servicio ErrorRateService y comprobación de porcentaje error', () => {
    component.modelosExists(sensoresJson);
    component.listSensoresExternos = sensoresExternosJson;

    const errorRate = new ErrorRateService();

    let media = errorRate.smartphoneMediaEquation(component.listSenCamara, component.listSensoresExternos.find(senExt => {return senExt.sensor === 'Cámara'}), 'Cámara');
    let mediaDuplicados = errorRate.mediaModelMarcaDuplicados(media, 'modelo');
    let menorFallo = errorRate.smartphoneMenosFallos(mediaDuplicados);

    expect(media.length > 0).toBeTrue();
    expect(mediaDuplicados.length > 0).toBeTrue();
    expect(menorFallo.length > 0).toBeTrue();
    expect(menorFallo[0].fallo).toEqual(0);
  });
});
