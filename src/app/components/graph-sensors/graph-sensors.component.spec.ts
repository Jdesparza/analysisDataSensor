import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';

import { GraphSensorsComponent } from './graph-sensors.component';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { By } from '@angular/platform-browser';

describe('GraphSensorsComponent', () => {
  let component: GraphSensorsComponent;
  let fixture: ComponentFixture<GraphSensorsComponent>;
  let serviceSenExterno: CrudSensorExternoService;
  let serviceSenSmartphones: SensoresSmartphonesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ GraphSensorsComponent ],
      providers: [
        FormBuilder,
        SensoresSmartphonesService
      ]
    })
    .compileComponents();

    serviceSenExterno = TestBed.inject(CrudSensorExternoService);
    serviceSenSmartphones = TestBed.inject(SensoresSmartphonesService);

    fixture = TestBed.createComponent(GraphSensorsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtencion de datos de sensores smartphone y externos por metodo de llamado a servicios', (done: DoneFn) => {

    component.infoSensorSmartphone = ['sensorCamara', 'Cámara'];
    serviceSenExterno.getSensorExterno().subscribe(sensorsExterns => {
      component.calSensorExterno  = sensorsExterns.find((senExt: { sensor: string; }) => {return senExt.sensor === component.infoSensorSmartphone[1]});;
    });

    serviceSenSmartphones.getSensorSmartphoneExist(component.infoSensorSmartphone[0]).subscribe(sensorSmartphone => {
      component.listSensorSmartphone = sensorSmartphone;
      component.tempListSensorSmartphone = deepCopy(component.listSensorSmartphone);

      expect(component.infoSensorSmartphone.length > 0).toBeTrue();
      expect(Object.keys(component.calSensorExterno).length > 0).toBeTrue();
      expect(component.listSensorSmartphone.length > 0).toBeTrue();
      expect(component.tempListSensorSmartphone.length > 0).toBeTrue();
      done()
    });
  });

  it('Verificación de datos para la gráfica', (done: DoneFn) => {
    let tamanio;

    component.infoSensorSmartphone = ['sensorCamara', 'Cámara'];
    serviceSenExterno.getSensorExterno().subscribe(sensorsExterns => {
      component.calSensorExterno  = sensorsExterns.find((senExt: { sensor: string; }) => {return senExt.sensor === component.infoSensorSmartphone[1]});;
    });

    serviceSenSmartphones.getSensorSmartphoneExist(component.infoSensorSmartphone[0]).subscribe(sensorSmartphone => {
      component.listSensorSmartphone = sensorSmartphone;
      component.tempListSensorSmartphone = deepCopy(component.listSensorSmartphone);
      component.graficSmartphoneModelMenosFallos();
      tamanio = component.labelsGrafic.length;

      expect(component.labelsGrafic.length > 0).toBeTrue();
      expect(component.dataErrorGrafic.length).toEqual(tamanio);
      expect(component.dataExactitudGrafic.length).toEqual(tamanio);
      done()
    });
  });

  it('verificar validacion formulario gráfica para filtrado de datos', () => {
    let controlMarcaModelo = component.filterControlForm.controls['controlMarcaModelo']
    let controlCantDatos = component.filterControlForm.controls['controlCantDatos']
    controlMarcaModelo.setValue('marca')
    controlCantDatos.setValue(15)

    expect(controlMarcaModelo.value != component.marcaModeloForm).toBeTrue();
    expect(controlCantDatos.value != component.cantDatosMostrarForm).toBeTrue();
  });
});

