import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { ErrorRateService } from 'src/app/services/error-rate-model/error-rate-model.service';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';

@Component({
  selector: 'app-podometro',
  templateUrl: './podometro.component.html',
  styleUrls: ['./podometro.component.css']
})
export class PodometroComponent implements OnInit {
  infoSensorSmartphone: string[] = ['sensorPodometro', 'Podómetro']

  listSensorSmartphone: any;
  tempListSensorSmartphone: any;
  //listSensoresExternos: any[] = [{}];
  calSensorExterno: any;

  controlBuscador = new FormControl();
  isCloseSearch = false;

  constructor(
    private nameSensorService: NameSensorService,
    private sensoresSmartphoneService: SensoresSmartphonesService,
    private crudSensorExternoService: CrudSensorExternoService,
    private errorRateService: ErrorRateService,
  ) {
  }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Podómetro";
    this.data();
    this.buscadorChange();
  }

  data() {
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorsExterns => {
      this.calSensorExterno  = sensorsExterns.find((senExt: { sensor: string; }) => {return senExt.sensor === this.infoSensorSmartphone[1]});;
      //console.log(this.calSensorExterno);
    });
    //this.calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Acelerómetro'});
    this.sensoresSmartphoneService.getSensorSmartphoneExist(this.infoSensorSmartphone[0]).subscribe(sensorSmartphone => {
      this.listSensorSmartphone = sensorSmartphone;
      this.tempListSensorSmartphone = deepCopy(this.listSensorSmartphone);
    });
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
    if (busqueda != '' && this.isCloseSearch) {
      this.tempListSensorSmartphone = deepCopy(this.listSensorSmartphone);
      this.tempListSensorSmartphone = this.tempListSensorSmartphone.filter((res: { modelo: string; fabricante: string; }) => 
        res.modelo.toUpperCase().includes(busqueda.toUpperCase()) || res.fabricante.toUpperCase().includes(busqueda.toUpperCase())
      );
    }
    else if (busqueda == '') 
      this.tempListSensorSmartphone = deepCopy(this.listSensorSmartphone);
  }

  resetSearch() {
    this.controlBuscador.reset();
    this.isCloseSearch = false;
    this.tempListSensorSmartphone = deepCopy(this.listSensorSmartphone);
  }

  errorPercentage(smartphone: {}) {
    let sensorFalloMediaCalculada: any;
    let smartMenosFallos: any;

    sensorFalloMediaCalculada = this.errorRateService.smartphoneMediaEquation([smartphone], this.calSensorExterno, this.infoSensorSmartphone[1]);
    smartMenosFallos = this.errorRateService.smartphoneMenosFallos(sensorFalloMediaCalculada);
    //console.log(this.calSensorExterno);

    return smartMenosFallos[0].fallo;
  }
}
