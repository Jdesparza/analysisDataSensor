import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore, DocumentReference } from '@angular/fire/firestore';

import { SensorsExternsComponent } from './sensors-externs.component';
import { FormBuilder } from '@angular/forms';
import sensoresExternosJson  from 'src/assets/json/sensoresExternos.json';

describe('SensorsExternsComponent', () => {
  let component: SensorsExternsComponent;
  let fixture: ComponentFixture<SensorsExternsComponent>;
  let service: CrudSensorExternoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ SensorsExternsComponent ],
      providers: [
        CrudSensorExternoService,
        FormBuilder
      ]
    })
    .compileComponents();

    service = TestBed.inject(CrudSensorExternoService);

    fixture = TestBed.createComponent(SensorsExternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('add sensor externo',  (done: DoneFn) => {

    let fabricante = component.formSenExterno.controls['fabricante'];
    let cal1_val1 = component.formSenExterno.controls['cal1_value1'];
    let cal1_val2 = component.formSenExterno.controls['cal1_value2'];
    let cal1_val3 = component.formSenExterno.controls['cal1_value3'];
    let cal2_val1 = component.formSenExterno.controls['cal2_value1'];
    let cal2_val2 = component.formSenExterno.controls['cal2_value2'];
    let cal2_val3 = component.formSenExterno.controls['cal2_value3'];

    fabricante.setValue('UnitTest')
    cal1_val1.setValue('12');
    cal1_val2.setValue('12');
    cal1_val3.setValue('12');
    cal2_val1.setValue('12');
    cal2_val2.setValue('12');
    cal2_val3.setValue('12');

    component.optionSensor = 'Magnetómetro UnitTest';

    service.addSensorExterno(component.cargarData()).then(r => {
      expect(r.id != null).toBeTrue();
      done()
    })
  });

  it('update sensor externo',  (done: DoneFn) => {
    let fabricante = component.formSenExterno.controls['fabricante'];
    let cal1_val1 = component.formSenExterno.controls['cal1_value1'];
    let cal2_val1 = component.formSenExterno.controls['cal2_value1'];



    fabricante.setValue('UnitTest V2')
    cal1_val1.setValue(Math.random()*700+50);
    cal2_val1.setValue(Math.random()*700+50);

    component.optionSensor = 'Magnetómetro UnitTest Update';

    service.updateSensorExterno('VN7Qi2rLWPDhJE99UpAk', component.cargarData()).then(r => {
      expect(r).toBeUndefined();
      done()
    })
  });

  it('delete and get sensor externo', (done: DoneFn) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    let sensor = undefined;

    service.getSensorExterno().subscribe(sensorExterno => {
      sensor = sensorExterno.find((s: { sensor: string; }) => {return s.sensor === 'Magnetómetro UnitTest'});
      if(sensor != undefined) {
        service.deleteSensorExterno(sensor).then(response => {
          expect(sensorExterno.length > 0).toBeTrue(); //Comprobar si trae una lista de sensores externos
          expect(response).toBeUndefined(); // Promesa al completarse la eliminación de un sensor
          done()
        });
      }
    })
  });
});
