import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import sensoresJson  from 'src/assets/json/sensores.json';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';
import { By } from '@angular/platform-browser';

import { CamaraComponent } from './camara.component';

describe('CamaraComponent', () => {
  let component: CamaraComponent;
  let fixture: ComponentFixture<CamaraComponent>;

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
      declarations: [ CamaraComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Guardado correcto de sensor externo cámara', () => {
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Cámara'});

    expect(Object.keys(component.calSensorExterno).length > 0).toBeTrue();
  });

  it('Guardado correcto de sensores cámara existentes', () => {
    let sensores = sensoresJson.filter((res: {sensorCamara: any;}) => res.sensorCamara.isExists == true);

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

  it('Cálculo error de un modelo que tenga cámara', () => {
    component.infoSensorSmartphone = ['sensorCamara', 'Cámara'];
    let sensores = sensoresJson.filter((res: {sensorCamara: any;}) => res.sensorCamara.isExists == true);
    component.calSensorExterno = sensoresExternosJson.find((senExt: { sensor: string; }) => {return senExt.sensor === 'Cámara'});

    let error = component.errorPercentage(sensores[0]);
    
    expect(error).toEqual(18.468858611579126);
  });
});
