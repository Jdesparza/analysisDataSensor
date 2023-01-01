import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import sensoresJson  from 'src/assets/json/sensores.json';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';
import { By } from '@angular/platform-browser';

import { MicrofonoComponent } from './microfono.component';

describe('MicrofonoComponent', () => {
  let component: MicrofonoComponent;
  let fixture: ComponentFixture<MicrofonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        SensoresSmartphonesService,
      ],
      declarations: [ MicrofonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrofonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Guardado correcto de sensor externo Micrófono', () => {
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Micrófono'});

    expect(Object.keys(component.calSensorExterno).length > 0).toBeTrue();
  });

  it('Guardado correcto de sensores Micrófono existentes', () => {
    let sensores = sensoresJson.filter((res: {sensorMicrofono: any;}) => res.sensorMicrofono.isExists == true);

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

  it('Cálculo error de un modelo que tenga Micrófono', () => {
    component.infoSensorSmartphone = ['sensorMicrofono', 'Micrófono'];
    let sensores = sensoresJson.filter((res: {sensorMicrofono: any;}) => res.sensorMicrofono.isExists == true);
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Micrófono'});

    let error = component.errorPercentage(sensores[0]);
    
    expect(error).toEqual(3.306307638043719);
  });
});
