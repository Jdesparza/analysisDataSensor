import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { ErrorRateService } from 'src/app/services/error-rate/error-rate.service';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';

@Component({
  selector: 'app-acelerometro',
  templateUrl: './acelerometro.component.html',
  styleUrls: ['./acelerometro.component.css']
})
export class AcelerometroComponent implements OnInit {

  listSensorAcelerometro: any;
  tempListSensorAcelerometro: any;
  listSensoresExternos: any[] = [{}];
  calSensorExterno: any;
  cont = 0;

  checkRadioFilter = [
    {
      id: '1',
      value: 10,
      check: true,
    },
    {
      id: '2',
      value: 15,
      check: false,
    },
    {
      id: '3',
      value: 20,
      check: false,
    },
  ];
  filterControl: FormGroup;

  controlBuscador = new FormControl();
  isCloseSearch = false;

  constructor(
    private nameSensorService: NameSensorService,
    private sensoresSmartphoneService: SensoresSmartphonesService,
    private crudSensorExternoService: CrudSensorExternoService,
    private errorRateService: ErrorRateService,
    private formBuilder: FormBuilder,
  ) {
    this.filterControl = this.formBuilder.group({

    });
  }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Acelerómetro";
    this.data();
    this.buscadorChange();
  }

  data() {
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorsExterns => {
      this.listSensoresExternos = sensorsExterns;
      //console.log(this.listSensoresExternos);
    });
    
    this.sensoresSmartphoneService.getSensorSmartphoneExist('sensorAcelerometro').subscribe(sensorSmartphone => {
      this.listSensorAcelerometro = sensorSmartphone;
      this.tempListSensorAcelerometro = deepCopy(this.listSensorAcelerometro);
      console.log(this.listSensorAcelerometro);
    });
  }

  getAceleracionCal(aceleracion: any, eje: string) {
    if (aceleracion != undefined) {
      if (eje == "x") return aceleracion.x;
      if (eje == "y") return aceleracion.y;
      if (eje == "z") return aceleracion.z;
    }
  }

  buscadorChange() {
    this.controlBuscador.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(q => {
      this.buscadorFiltrarList(q);
    })

    this.controlBuscador.valueChanges
    .subscribe(q => {
      if (q != '') this.isCloseSearch = true;
      else if(q == '') this.isCloseSearch = false;
    })
  }

  buscadorFiltrarList(busqueda: string) {
    if (busqueda != '') {
      this.tempListSensorAcelerometro = deepCopy(this.listSensorAcelerometro);
      this.tempListSensorAcelerometro = this.tempListSensorAcelerometro.filter((res: { modelo: string; fabricante: string; }) => 
        res.modelo.toUpperCase().includes(busqueda.toUpperCase()) || res.fabricante.toUpperCase().includes(busqueda.toUpperCase())
      );
    }
    else if (busqueda == '') 
      this.tempListSensorAcelerometro = deepCopy(this.listSensorAcelerometro);
  }

  resetSearch() {
    this.controlBuscador.reset();
    this.isCloseSearch = false;
    this.tempListSensorAcelerometro = deepCopy(this.listSensorAcelerometro);
  }

  errorPercentage(smartphone: any) {
    let sensorFalloMediaCalculada: any;
    let smartMenosFallos: any;

    this.calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Acelerómetro'});
    sensorFalloMediaCalculada = this.errorRateService.smartphoneMediaEquation(smartphone, this.calSensorExterno, 'Acelerómetro');
    smartMenosFallos = this.errorRateService.smartphoneMenosFallos(sensorFalloMediaCalculada);

    return smartMenosFallos.fallo;
  }
  

}
