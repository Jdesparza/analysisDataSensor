import { Component, OnInit } from '@angular/core';
import SensorExterno from 'src/app/interfaces/sensor-externo';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

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
      route: 'acelerometro'
    },
    {
      id: '2',
      sensor: 'Proximidad',
      analisis: null,
      icon: 'ic_proximidad',
      modelSmartphone: '',
      route: 'proximidad'
    },
    {
      id: '3',
      sensor: 'Luz',
      analisis: null,
      icon: 'ic_luz',
      modelSmartphone: '',
      route: 'luz'
    },
    {
      id: '4',
      sensor: 'Giroscopio',
      analisis: null,
      icon: 'ic_giroscopio',
      modelSmartphone: '',
      route: 'giroscopio'
    },
    {
      id: '5',
      sensor: 'Magnetómetro',
      analisis: null,
      icon: 'ic_magnetometro',
      modelSmartphone: '',
      route: 'magnetometro'
    },
    {
      id: '6',
      sensor: 'Podómetro',
      analisis: null,
      icon: 'ic_podometro',
      modelSmartphone: '',
      route: 'podometro'
    },
    {
      id: '7',
      sensor: 'Cámara',
      analisis: null,
      icon: 'ic_camara',
      modelSmartphone: '',
      route: 'camara'
    },
    {
      id: '8',
      sensor: 'Barómetro',
      analisis: null,
      icon: 'ic_barometro',
      modelSmartphone: '',
      route: 'barometro'
    },
    {
      id: '9',
      sensor: 'GPS',
      analisis: null,
      icon: 'ic_gps',
      modelSmartphone: '',
      route: 'gps'
    },
    {
      id: '10',
      sensor: 'Micrófono',
      analisis: null,
      icon: 'ic_microfono',
      modelSmartphone: '',
      route: 'microfono'
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

  constructor(
    private nameSensorService: NameSensorService,
    private sensoresSmartphoneService: SensoresSmartphonesService,
    private crudSensorExternoService: CrudSensorExternoService,
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
    let smartMenosFallos: { modelo: any; fallo: any; };
    
    
    this.listSenProximidad = sensorsSmartphoneD.filter((res: {sensorProximidad: any;}) => 
      res.sensorProximidad.isExists == true && (res.sensorProximidad.proximidad_1 != undefined || res.sensorProximidad.proximidad_2 != undefined));
    this.listSenLuz = sensorsSmartphoneD.filter((res: {sensorLuz: any;}) => 
      res.sensorLuz.isExists == true && (res.sensorLuz.iluminacion_1 != undefined || res.sensorLuz.iluminacion_2 != undefined));
    this.listSenPodometro = sensorsSmartphoneD.filter((res: {sensorPodometro: any;}) => 
      res.sensorPodometro.isExists == true && (res.sensorPodometro.calPasos_10 != undefined || res.sensorPodometro.calPasos_15 != undefined));
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
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenProximidad, calSensorExterno, 'De Proximidad');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Proximidad', smartMenosFallos);
      }
    }

    // Luz
    if (this.listSenLuz.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'De Luz'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenLuz, calSensorExterno, 'De Luz');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Luz', smartMenosFallos);
      }
    }

    // Podometro
    if (this.listSenPodometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Podómetro'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenPodometro, calSensorExterno, 'Podómetro');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Podómetro', smartMenosFallos);
      }
    }

    // Cámara
    if (this.listSenCamara.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Cámara'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenCamara, calSensorExterno, 'Cámara');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Cámara', smartMenosFallos);
      }
    }

    // Barometro
    if (this.listSenBarometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Barómetro'});
      if(calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenBarometro, calSensorExterno, 'Barómetro');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Barómetro', smartMenosFallos);
      }
    }

    // Microfono
    if (this.listSenMicrofono.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Micrófono'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenMicrofono, calSensorExterno, 'Micrófono');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Micrófono', smartMenosFallos);
      }
    }

    // Acelerometro
    if (this.listSenAcelerometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Acelerómetro'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenAcelerometro, calSensorExterno, 'Acelerómetro');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Acelerómetro', smartMenosFallos);
      }
    }

    // Giroscopio
    if (this.listSenGiroscopio.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Giroscopio'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenGiroscopio, calSensorExterno, 'Giroscopio');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Giroscopio', smartMenosFallos);
      }
    }

    // Magnetometro
    if (this.listSenMagnetometro.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'Magnetómetro'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenMagnetometro, calSensorExterno, 'Magnetómetro');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('Magnetómetro', smartMenosFallos);
      }
    }

    // GPS
    if (this.listSenGPS.length > 0) {
      calSensorExterno = this.listSensoresExternos.find(senExt => {return senExt.sensor === 'GPS'});
      if (calSensorExterno != undefined) {
        sensorFalloMediaCalculada = this.smartphoneMediaEquation(this.listSenGPS, calSensorExterno, 'GPS');
        smartMenosFallos = this.smartphoneMenosFallos(sensorFalloMediaCalculada);

        this.registrarDatosCard('GPS', smartMenosFallos);
      }
    }
  }

  smartphoneMediaEquation(sensorList: any, sensorExt: any, nameSensor: string) {

    let senSmartCal1Fallo: any;
    let senSmartCal2Fallo: any;
    let media;
    let sensorFalloMediaCalculada: [{ modelo: string; fallo: number}] = [{modelo: '', fallo: 0,}];
    let camMP;
    let mediaSE_Cal;
    let mediaSmart_Cal;

    //if(nameSensor == 'Cámara') console.log(sensorList);

    for (var i = 0; i < sensorList.length; i++) {
      senSmartCal1Fallo = null;
      senSmartCal2Fallo = null;
      if(nameSensor == 'Cámara') camMP = null;
      else if(nameSensor == 'Acelerómetro' || nameSensor == 'Giroscopio' || nameSensor == 'Magnetómetro') {
        mediaSE_Cal = null; 
        mediaSmart_Cal = null 
      };

      if (nameSensor == 'De Proximidad') {
        if (sensorList[i].sensorProximidad.proximidad_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorProximidad.proximidad_1);
        else if (sensorList[i].sensorProximidad.proximidad_2 != undefined && sensorExt.cal2 .length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorProximidad.proximidad_2);
      } else if(nameSensor == 'De Luz') {
        if (sensorList[i].sensorLuz.iluminacion_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorLuz.iluminacion_1);
        else if (sensorList[i].sensorLuz.iluminacion_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorLuz.iluminacion_2);
      } else if(nameSensor == 'Podómetro') {
        if (sensorList[i].sensorPodometro.calPasos_10 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorPodometro.calPasos_10);
        else if (sensorList[i].sensorPodometro.calPasos_15 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorPodometro.calPasos_15);
      } else if(nameSensor == 'Cámara') {
        if (sensorList[i].sensorCamara.camTrasera != undefined) {
          camMP = (sensorExt.cal1[0] * sensorExt.cal1[1]) / 1000000.0;
          senSmartCal1Fallo = this.equationPorcentajeError(camMP, sensorList[i].sensorCamara.camTrasera.megapixels);
        }
        else if (sensorList[i].sensorCamara.camFrontal != undefined && sensorExt.cal2.length > 0) {
          camMP = (sensorExt.cal2[0] * sensorExt.cal2[1]) / 1000000.0;
          senSmartCal2Fallo = this.equationPorcentajeError(camMP, sensorList[i].sensorCamara.camFrontal.megapixels);
        }
      } else if(nameSensor == 'Barómetro') {
        if (sensorList[i].sensorBarometro.presion_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorBarometro.presion_1.presion);
        else if (sensorList[i].sensorBarometro.presion_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorBarometro.presion_2.presion);
      } else if(nameSensor == 'Micrófono') {
        if (sensorList[i].sensorMicrofono.calSonido_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[1], sensorList[i].sensorMicrofono.calSonido_1.max);
        else if (sensorList[i].sensorMicrofono.calSonido_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[1], sensorList[i].sensorMicrofono.calSonido_2.max);
      } else if(nameSensor == 'Acelerómetro') {
        if (sensorList[i].sensorAcelerometro.aceleracion_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorAcelerometro.aceleracion_1.x + sensorList[i].sensorAcelerometro.aceleracion_1.y + sensorList[i].sensorAcelerometro.aceleracion_1.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        else if (sensorList[i].sensorAcelerometro.aceleracion_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorAcelerometro.aceleracion_2.x + sensorList[i].sensorAcelerometro.aceleracion_2.y + sensorList[i].sensorAcelerometro.aceleracion_2.z) / 3;
          senSmartCal2Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'Giroscopio') {
        if (sensorList[i].sensorGiroscopio.rotacion_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorGiroscopio.rotacion_1.x + sensorList[i].sensorGiroscopio.rotacion_1.y + sensorList[i].sensorGiroscopio.rotacion_1.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        else if (sensorList[i].sensorGiroscopio.rotacion_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorGiroscopio.rotacion_2.x + sensorList[i].sensorGiroscopio.rotacion_2.y + sensorList[i].sensorGiroscopio.rotacion_2.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'Magnetómetro') {
        if (sensorList[i].sensorMagnetometro.magnetismo_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorMagnetometro.magnetismo_1.x + sensorList[i].sensorMagnetometro.magnetismo_1.y + sensorList[i].sensorMagnetometro.magnetismo_1.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        else if (sensorList[i].sensorMagnetometro.magnetismo_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorMagnetometro.magnetismo_2.x + sensorList[i].sensorMagnetometro.magnetismo_2.y + sensorList[i].sensorMagnetometro.magnetismo_2.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'GPS') {
        if (sensorList[i].sensorGPS.ubicacion_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorGPS.ubicacion_1.latitud + sensorList[i].sensorGPS.ubicacion_1.longitud) / 2;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        else if (sensorList[i].sensorGPS.ubicacion_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorGPS.ubicacion_2.latitud + sensorList[i].sensorGPS.ubicacion_2.longitud) / 2;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      }

      // Media Aritmética
      if (senSmartCal1Fallo != null && senSmartCal2Fallo != null) {
        media = (senSmartCal1Fallo + senSmartCal2Fallo) / 2;
      } else if (senSmartCal1Fallo != null && senSmartCal2Fallo == null) {
        media = senSmartCal1Fallo;
      } else if (senSmartCal1Fallo == null && senSmartCal2Fallo != null) {
        media = senSmartCal2Fallo;
      }

      // Guardar Datos
      sensorFalloMediaCalculada[i] = {
        modelo: sensorList[i].modelo,
        fallo: media,
      };
      //console.log(nameSensor + "\nFallo Cal1: " + senSmartCal1Fallo + "\nFallo Cal2: " + senSmartCal2Fallo + "\nMedia: " + media);
    }
    return sensorFalloMediaCalculada;
  }

  equationPorcentajeError(sensorExterno: any, sensorSmartphone: any) {
    let error = ((sensorSmartphone - sensorExterno) / sensorExterno) * 100.00;
    error = Math.abs(error);
    if (error > 100) error = 100;
    else if (isNaN(error)) error = 0;
    //console.log("sE: " + sensorExterno + "\nsS: " + sensorSmartphone + "\n %: " + error);
    return error;
  }

  smartphoneMenosFallos(sensorMediaFalloCalculada: any) {
    let numMenor = Number.MAX_VALUE;
    let valorCal = null;
    let posicion = 0;

    for (var i = 0; i < sensorMediaFalloCalculada.length; i++) {
      valorCal = sensorMediaFalloCalculada[i].fallo;
      if (valorCal == 0) {
        return sensorMediaFalloCalculada[i];
      } else {
        if(valorCal < numMenor) {
          numMenor = valorCal;
          posicion = i;
        }
      }
    }
    //console.log(sensorMediaFalloCalculada);
    return sensorMediaFalloCalculada[posicion];
  }

  registrarDatosCard(nameSensor: string, smartMenosFallos: any) {
    this.tempListSensorsCard = this.tempListSensorsCard.map(sCard => 
      sCard.sensor === nameSensor? {...sCard, modelSmartphone: smartMenosFallos.modelo, 
        analisis: smartMenosFallos.fallo}  : sCard
    );
  }

}
