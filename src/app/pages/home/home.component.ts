import { Component, OnInit } from '@angular/core';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { ErrorRateService } from 'src/app/services/error-rate-model/error-rate-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listSensors = [
    {
      id: '1',
      sensor: 'Acelerómetro',
      analisis: null,
      icon: 'ic_acelerometro',
      modelSmartphone: '',
      route: 'Sensor/Acelerometro'
    },
    {
      id: '2',
      sensor: 'Proximidad',
      analisis: null,
      icon: 'ic_proximidad',
      modelSmartphone: '',
      route: 'Sensor/Proximidad'
    },
    {
      id: '3',
      sensor: 'Luz',
      analisis: null,
      icon: 'ic_luz',
      modelSmartphone: '',
      route: 'Sensor/Luz'
    },
    {
      id: '4',
      sensor: 'Giroscopio',
      analisis: null,
      icon: 'ic_giroscopio',
      modelSmartphone: '',
      route: 'Sensor/Giroscopio'
    },
    {
      id: '5',
      sensor: 'Magnetómetro',
      analisis: null,
      icon: 'ic_magnetometro',
      modelSmartphone: '',
      route: 'Sensor/Magnetometro'
    },
    {
      id: '6',
      sensor: 'Podómetro',
      analisis: null,
      icon: 'ic_podometro',
      modelSmartphone: '',
      route: 'Sensor/Podometro'
    },
    {
      id: '7',
      sensor: 'Cámara',
      analisis: null,
      icon: 'ic_camara',
      modelSmartphone: '',
      route: 'Sensor/Camara'
    },
    {
      id: '8',
      sensor: 'Barómetro',
      analisis: null,
      icon: 'ic_barometro',
      modelSmartphone: '',
      route: 'Sensor/Barometro'
    },
    {
      id: '9',
      sensor: 'GPS',
      analisis: null,
      icon: 'ic_gps',
      modelSmartphone: '',
      route: 'Sensor/GPS'
    },
    {
      id: '10',
      sensor: 'Micrófono',
      analisis: null,
      icon: 'ic_microfono',
      modelSmartphone: '',
      route: 'Sensor/Microfono'
    },
    {
      id: '11',
      sensor: 'Termómetro',
      analisis: null,
      icon: 'ic_termometro',
      modelSmartphone: '',
      route: 'Sensor/Termometro'
    }
  ];
  tempListSensorsCard: any[] = [];

  cont = 0;
  listSensoresExternos: any[] = [{}];
  tempList = new Array();

  listSenProximidad: any;
  listSenLuz: any;
  listSenAcelerometro: any;
  listSenGiroscopio: any;
  listSenMagnetometro: any;
  listSenPodometro: any;
  listSenCamara: any;
  listSenBarometro: any;
  listSenGPS: any;
  listSenMicrofono: any;
  listSenTermometro: any;

  constructor(
    private nameSensorService: NameSensorService,
    private sensoresSmartphoneService: SensoresSmartphonesService,
    private crudSensorExternoService: CrudSensorExternoService,
    private errorRateModelService: ErrorRateService,
  ) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Home";
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorsExterns => {
      this.listSensoresExternos = sensorsExterns;
      //console.log(this.listSensoresExternos);
    });
    this.sensoresSmartphoneService.getSensorSmartphone().subscribe(sensorsSmartphoneD => {
      this.tempListSensorsCard = deepCopy(this.listSensors);
      this.modelosExists(sensorsSmartphoneD);
    });
  }

  modelosExists(sensorsSmartphoneD: any) {
    //numCalc Sensor externo
    let calSensorExterno: any;
    let sensorFalloMediaCalculada: any;
    let smartMenosFallos;
    let dataObjects: [{modelo: string; marca: string; fallo: number;}];
    
    
    this.listSenProximidad = sensorsSmartphoneD.filter((res: {sensorProximidad: any;}) => 
      res.sensorProximidad.isExists == true && (res.sensorProximidad.proximidad_1 != undefined || res.sensorProximidad.proximidad_2 != undefined));
    this.listSenLuz = sensorsSmartphoneD.filter((res: {sensorLuz: any;}) => 
      res.sensorLuz.isExists == true && (res.sensorLuz.iluminacion_1 != undefined || res.sensorLuz.iluminacion_2 != undefined));
    this.listSenPodometro = sensorsSmartphoneD.filter((res: {sensorPodometro: any;}) => 
      res.sensorPodometro.isExists == true && (res.sensorPodometro.calPasos_10 != undefined || res.sensorPodometro.calPasos_15 != undefined));
    this.listSenTermometro = sensorsSmartphoneD.filter((res: {sensorTermometro: any;}) => 
      res.sensorTermometro.isExists == true && (res.sensorTermometro.temperatura_1 != undefined || res.sensorTermometro.temperatura_2 != undefined));

    this.listSenCamara = sensorsSmartphoneD.filter((res: {sensorCamara: any;}) => 
      res.sensorCamara.isExists == true && (res.sensorCamara.camTrasera != undefined || res.sensorCamara.camFrontal != undefined));
    this.listSenBarometro = sensorsSmartphoneD.filter((res: {sensorBarometro: any;}) => 
      res.sensorBarometro.isExists == true && (res.sensorBarometro.presion_1 != undefined || res.sensorBarometro.presion_2 != undefined));
    this.listSenMicrofono = sensorsSmartphoneD.filter((res: {sensorMicrofono: any;}) => 
      res.sensorMicrofono.isExists == true && (res.sensorMicrofono.calSonido_1 != undefined || res.sensorMicrofono.calSonido_2 != undefined));

    this.listSenAcelerometro = sensorsSmartphoneD.filter((res: {sensorAcelerometro: any;}) => 
      res.sensorAcelerometro.isExists == true && (res.sensorAcelerometro.aceleracion_1 != undefined || res.sensorAcelerometro.aceleracion_2 != undefined));
    this.listSenGiroscopio = sensorsSmartphoneD.filter((res: {sensorGiroscopio: any;}) => 
      res.sensorGiroscopio.isExists == true && (res.sensorGiroscopio.rotacion_1 != undefined || res.sensorGiroscopio.rotacion_2 != undefined));
    this.listSenMagnetometro = sensorsSmartphoneD.filter((res: {sensorMagnetometro: any;}) => 
    res.sensorMagnetometro.isExists == true && (res.sensorMagnetometro.magnetismo_1 != undefined || res.sensorMagnetometro.magnetismo_2 != undefined));
    
    this.listSenGPS = sensorsSmartphoneD.filter((res: {sensorGPS: any;}) => 
      res.sensorGPS.isExists == true && (res.sensorGPS.ubicacion_1 != undefined || res.sensorGPS.ubicacion_2 != undefined));


    // Proximidad
    if (this.listSenProximidad.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'De Proximidad'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenProximidad, calSensorExterno, 'De Proximidad');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Proximidad', smartMenosFallos);
      }
    }

    // Luz
    if (this.listSenLuz.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'De Luz'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenLuz, calSensorExterno, 'De Luz');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Luz', smartMenosFallos);
      }
    }

    // Podometro
    if (this.listSenPodometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Podómetro'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenPodometro, calSensorExterno, 'Podómetro');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Podómetro', smartMenosFallos);
      }
    }

    // Termómetro
    if (this.listSenTermometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Termómetro'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenTermometro, calSensorExterno, 'Termómetro');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Termómetro', smartMenosFallos);
      }
    }

    // Cámara
    if (this.listSenCamara.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Cámara'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenCamara, calSensorExterno, 'Cámara');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Cámara', smartMenosFallos);
      }
    }

    // Barometro
    if (this.listSenBarometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Barómetro'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenBarometro, calSensorExterno, 'Barómetro');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Barómetro', smartMenosFallos);
      }
    }

    // Microfono
    if (this.listSenMicrofono.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Micrófono'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenMicrofono, calSensorExterno, 'Micrófono');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Micrófono', smartMenosFallos);
      }
    }

    // Acelerometro
    if (this.listSenAcelerometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Acelerómetro'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenAcelerometro, calSensorExterno, 'Acelerómetro');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        console.log(smartMenosFallos);

        this.registrarDatosCard('Acelerómetro', smartMenosFallos);
      }
    }

    // Giroscopio
    if (this.listSenGiroscopio.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Giroscopio'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenGiroscopio, calSensorExterno, 'Giroscopio');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Giroscopio', smartMenosFallos);
      }
    }

    // Magnetometro
    if (this.listSenMagnetometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Magnetómetro'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenMagnetometro, calSensorExterno, 'Magnetómetro');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('Magnetómetro', smartMenosFallos);
      }
    }

    // GPS
    if (this.listSenGPS.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'GPS'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.errorRateModelService.smartphoneMediaEquation(this.listSenGPS, calSensorExterno, 'GPS');
        dataObjects = this.errorRateModelService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, 'modelo');
        smartMenosFallos = this.errorRateModelService.smartphoneMenosFallos(dataObjects);

        this.registrarDatosCard('GPS', smartMenosFallos);
      }
    }
  }

  registrarDatosCard(nameSensor: string, smartMenosFallos: any) {
    this.tempListSensorsCard = this.tempListSensorsCard.map(sCard => 
      sCard.sensor === nameSensor? {...sCard, modelSmartphone: smartMenosFallos[0].modelo, 
        analisis: smartMenosFallos[0].fallo}  : sCard
    );
  }

}
