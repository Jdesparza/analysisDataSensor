import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import sensoresJson  from 'src/assets/json/sensores.json';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';

import { AcelerometroComponent } from './acelerometro.component';
import { By } from '@angular/platform-browser';

describe('AcelerometroComponent', () => {
  let component: AcelerometroComponent;
  let fixture: ComponentFixture<AcelerometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ AcelerometroComponent ],
      providers: [
        SensoresSmartphonesService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcelerometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Guardado correcto de sensor externo acelerómetro', () => {
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Acelerómetro'});

    expect(Object.keys(component.calSensorExterno).length > 0).toBeTrue();
  });

  it('Guardado correcto de sensores Acelerómetro existentes', () => {
    let sensores = sensoresJson.filter((res: {sensorAcelerometro: any;}) => res.sensorAcelerometro.isExists == true);

    component.listSensorSmartphone = sensores;

    expect(component.listSensorSmartphone.length > 0).toBeTrue();
  });

  it('buscador validado filtro', () => {
    let marca = 'samsung'

    component.controlBuscador.setValue(marca);
    component.buscadorChange()
    
    expect(component.controlBuscador.value).toEqual(marca);
    expect(component.isCloseSearch).toBeTrue();
  });

  it('buscador filtro reset', () => {
    let marca = 'samsung'

    component.controlBuscador.setValue(marca);
    component.buscadorChange()
    
    expect(component.controlBuscador.value).toEqual(marca);
    expect(component.isCloseSearch).toBeTrue();

    fixture.detectChanges();
    
    const btnReset = fixture.debugElement.query(By.css('button'))
    btnReset.nativeElement.click()
    expect(component.controlBuscador.value).toBeNull();
    expect(component.isCloseSearch).toBeFalse();
  });

  it('Cálculo error de un modelo que tenga Acelerómetro', () => {
    component.infoSensorSmartphone = ['sensorAcelerometro', 'Acelerómetro'];
    let sensores = sensoresJson.filter((res: {sensorAcelerometro: any;}) => res.sensorAcelerometro.isExists == true);
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Acelerómetro'});

    let error = component.errorPercentage(sensores[0]);
    
    expect(error).toEqual(99.88834747998762);
  });
});
