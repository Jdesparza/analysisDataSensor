import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import sensoresJson  from 'src/assets/json/sensores.json';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';
import { By } from '@angular/platform-browser';

import { ProximidadComponent } from './proximidad.component';

describe('ProximidadComponent', () => {
  let component: ProximidadComponent;
  let fixture: ComponentFixture<ProximidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ ProximidadComponent ],
      providers: [
        SensoresSmartphonesService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Guardado correcto de sensor externo De Proximidad', () => {
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'De Proximidad'});

    expect(Object.keys(component.calSensorExterno).length > 0).toBeTrue();
  });

  it('Guardado correcto de sensores De Proximidad existentes', () => {
    let sensores = sensoresJson.filter((res: {sensorProximidad: any;}) => res.sensorProximidad.isExists == true);

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

  it('Cálculo error de un modelo que tenga De Proximidad', () => {
    component.infoSensorSmartphone = ['sensorProximidad', 'De Proximidad'];
    let sensores = sensoresJson.filter((res: {sensorProximidad: any;}) => res.sensorProximidad.isExists == true);
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'De Proximidad'});

    let error = component.errorPercentage(sensores[0]);
    
    expect(error).toEqual(0);
  });
});
