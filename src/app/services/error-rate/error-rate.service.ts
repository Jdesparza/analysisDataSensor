import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorRateService {

  constructor() { }

  smartphoneMediaEquation(sensorList: any, sensorExt: any, nameSensor: string) {

    let senSmartCal1Fallo: any;
    let senSmartCal2Fallo: any;
    let media;
    let sensorFalloMediaCalculada: [{ modelo: string; fallo: number}] = [{modelo: '', fallo: 0,}];
    let camMP;
    let mediaSE_Cal;
    let mediaSmart_Cal;

    //if(nameSensor == 'Cámara') console.log(sensorList);

    senSmartCal1Fallo = null;
    senSmartCal2Fallo = null;
    if(nameSensor == 'Cámara') camMP = null;
    else if(nameSensor == 'Acelerómetro' || nameSensor == 'Giroscopio' || nameSensor == 'Magnetómetro') {
      mediaSE_Cal = null; 
      mediaSmart_Cal = null 
    };

    if (nameSensor == 'De Proximidad') {
      if (sensorList.sensorProximidad.proximidad_1 != undefined) 
        senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList.sensorProximidad.proximidad_1);
      else if (sensorList.sensorProximidad.proximidad_2 != undefined && sensorExt.cal2 .length > 0) 
        senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList.sensorProximidad.proximidad_2);
    } else if(nameSensor == 'De Luz') {
      if (sensorList.sensorLuz.iluminacion_1 != undefined) 
        senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList.sensorLuz.iluminacion_1);
      else if (sensorList.sensorLuz.iluminacion_2 != undefined && sensorExt.cal2.length > 0) 
        senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList.sensorLuz.iluminacion_2);
    } else if(nameSensor == 'Podómetro') {
      if (sensorList.sensorPodometro.calPasos_10 != undefined) 
        senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList.sensorPodometro.calPasos_10);
      else if (sensorList.sensorPodometro.calPasos_15 != undefined && sensorExt.cal2.length > 0) 
        senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList.sensorPodometro.calPasos_15);
    } else if(nameSensor == 'Cámara') {
      if (sensorList.sensorCamara.camTrasera != undefined) {
        camMP = (sensorExt.cal1[0] * sensorExt.cal1[1]) / 1000000.0;
        senSmartCal1Fallo = this.equationPorcentajeError(camMP, sensorList.sensorCamara.camTrasera.megapixels);
      }
      else if (sensorList.sensorCamara.camFrontal != undefined && sensorExt.cal2.length > 0) {
        camMP = (sensorExt.cal2[0] * sensorExt.cal2[1]) / 1000000.0;
        senSmartCal2Fallo = this.equationPorcentajeError(camMP, sensorList.sensorCamara.camFrontal.megapixels);
      }
    } else if(nameSensor == 'Barómetro') {
      if (sensorList.sensorBarometro.presion_1 != undefined) 
        senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList.sensorBarometro.presion_1.presion);
      else if (sensorList.sensorBarometro.presion_2 != undefined && sensorExt.cal2.length > 0) 
        senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList.sensorBarometro.presion_2.presion);
    } else if(nameSensor == 'Micrófono') {
      if (sensorList.sensorMicrofono.calSonido_1 != undefined) 
        senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[1], sensorList.sensorMicrofono.calSonido_1.max);
      else if (sensorList.sensorMicrofono.calSonido_2 != undefined && sensorExt.cal2.length > 0) 
        senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[1], sensorList.sensorMicrofono.calSonido_2.max);
    } else if(nameSensor == 'Acelerómetro') {
      if (sensorList.sensorAcelerometro.aceleracion_1 != undefined) {
        mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorAcelerometro.aceleracion_1.x + sensorList.sensorAcelerometro.aceleracion_1.y + sensorList.sensorAcelerometro.aceleracion_1.z) / 3;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
      else if (sensorList.sensorAcelerometro.aceleracion_2 != undefined && sensorExt.cal2.length > 0) {
        mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorAcelerometro.aceleracion_2.x + sensorList.sensorAcelerometro.aceleracion_2.y + sensorList.sensorAcelerometro.aceleracion_2.z) / 3;
        senSmartCal2Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
    } else if(nameSensor == 'Giroscopio') {
      if (sensorList.sensorGiroscopio.rotacion_1 != undefined) {
        mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorGiroscopio.rotacion_1.x + sensorList.sensorGiroscopio.rotacion_1.y + sensorList.sensorGiroscopio.rotacion_1.z) / 3;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
      else if (sensorList.sensorGiroscopio.rotacion_2 != undefined && sensorExt.cal2.length > 0) {
        mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorGiroscopio.rotacion_2.x + sensorList.sensorGiroscopio.rotacion_2.y + sensorList.sensorGiroscopio.rotacion_2.z) / 3;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
    } else if(nameSensor == 'Magnetómetro') {
      if (sensorList.sensorMagnetometro.magnetismo_1 != undefined) {
        mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorMagnetometro.magnetismo_1.x + sensorList.sensorMagnetometro.magnetismo_1.y + sensorList.sensorMagnetometro.magnetismo_1.z) / 3;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
      else if (sensorList.sensorMagnetometro.magnetismo_2 != undefined && sensorExt.cal2.length > 0) {
        mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
        mediaSmart_Cal = (sensorList.sensorMagnetometro.magnetismo_2.x + sensorList.sensorMagnetometro.magnetismo_2.y + sensorList.sensorMagnetometro.magnetismo_2.z) / 3;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
    } else if(nameSensor == 'GPS') {
      if (sensorList.sensorGPS.ubicacion_1 != undefined) {
        mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1]) / 2;
        mediaSmart_Cal = (sensorList.sensorGPS.ubicacion_1.latitud + sensorList.sensorGPS.ubicacion_1.longitud) / 2;
        senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
      }
      else if (sensorList.sensorGPS.ubicacion_2 != undefined && sensorExt.cal2.length > 0) {
        mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1]) / 2;
        mediaSmart_Cal = (sensorList.sensorGPS.ubicacion_2.latitud + sensorList.sensorGPS.ubicacion_2.longitud) / 2;
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
    sensorFalloMediaCalculada[0] = {
      modelo: sensorList.modelo,
      fallo: media,
    };
    //console.log(nameSensor + "\nFallo Cal1: " + senSmartCal1Fallo + "\nFallo Cal2: " + senSmartCal2Fallo + "\nMedia: " + media);
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
}
