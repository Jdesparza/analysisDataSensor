import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorRateService {

  constructor() { }

  equationPorcentajeError(sensorExterno: any, sensorSmartphone: any) {
    let error = ((sensorSmartphone - sensorExterno) / sensorExterno) * 100.00;
    error = Math.abs(error);
    if (error > 100) error = 100;
    else if (isNaN(error)) error = 0;
    //console.log("sE: " + sensorExterno + "\nsS: " + sensorSmartphone + "\n %: " + error);
    return error;
  }

  smartphoneMediaEquation(sensorList: any, sensorExt: any, nameSensor: string) {
    let senSmartCal1Fallo: any;
    let senSmartCal2Fallo: any;
    let media;
    let sensorFalloMediaCalculada: [{ modelo: string; marca: string; fallo: number}] = [{modelo: '', marca: '', fallo: NaN,}];
    let camMP;
    let mediaSE_Cal;
    let mediaSmart_Cal;
    let contDatoResult = 0;

    for (var i = 0; i < sensorList.length; i++) {
      senSmartCal1Fallo = null;
      senSmartCal2Fallo = null;
      media = null;
      if(nameSensor == 'Cámara') camMP = null;
      else if(nameSensor == 'Acelerómetro' || nameSensor == 'Giroscopio' || nameSensor == 'Magnetómetro' || nameSensor == 'Micrófono') {
        mediaSE_Cal = null; 
        mediaSmart_Cal = null 
      };

      if (nameSensor == 'De Proximidad') {
        if (sensorList[i].sensorProximidad.proximidad_1 != undefined) {
          if (sensorList[i].sensorProximidad.proximidad_1 != sensorExt.cal1[0]) 
            senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorProximidad.proximidad_1);
          else senSmartCal1Fallo = 0.0
        } 
        if (sensorList[i].sensorProximidad.proximidad_2 != undefined && sensorExt.cal2 .length > 0) {
          if (sensorList[i].sensorProximidad.proximidad_2 < sensorExt.cal2[0]) 
            senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorProximidad.proximidad_2);
          else senSmartCal2Fallo = 0.0
        }
      } else if(nameSensor == 'De Luz') {
        if (sensorList[i].sensorLuz.iluminacion_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorLuz.iluminacion_1);
        if (sensorList[i].sensorLuz.iluminacion_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorLuz.iluminacion_2);
      } else if(nameSensor == 'Podómetro') {
        if (sensorList[i].sensorPodometro.calPasos_10 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorPodometro.calPasos_10);
        if (sensorList[i].sensorPodometro.calPasos_15 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorPodometro.calPasos_15);
      } else if(nameSensor == 'Termómetro') {
        if (sensorList[i].sensorTermometro.temperatura_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorTermometro.temperatura_1);
        if (sensorList[i].sensorTermometro.temperatura_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorTermometro.temperatura_2);
      } else if(nameSensor == 'Ritmo Cardíaco') {
        if (sensorList[i].sensorRitmoCardiaco.calRitmoCardiaco_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorRitmoCardiaco.calRitmoCardiaco_1);
        if (sensorList[i].sensorRitmoCardiaco.calRitmoCardiaco_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorRitmoCardiaco.calRitmoCardiaco_2);
      } else if(nameSensor == 'Cámara') {
        if (sensorList[i].sensorCamara.camTrasera != undefined) {
          camMP = (sensorExt.cal1[0] * sensorExt.cal1[1]) / 1000000.0;
          if (sensorList[i].sensorCamara.camTrasera.resolucion < camMP) senSmartCal1Fallo = this.equationPorcentajeError(camMP, sensorList[i].sensorCamara.camTrasera.resolucion);
          else senSmartCal1Fallo = 0.0;
        }
        if (sensorList[i].sensorCamara.camFrontal != undefined && sensorExt.cal2.length > 0) {
          camMP = (sensorExt.cal2[0] * sensorExt.cal2[1]) / 1000000.0;
          if (sensorList[i].sensorCamara.camFrontal.resolucion < camMP) senSmartCal2Fallo = this.equationPorcentajeError(camMP, sensorList[i].sensorCamara.camFrontal.resolucion);
          else senSmartCal2Fallo = 0.0;
        }
      } else if(nameSensor == 'Barómetro') {
        if (sensorList[i].sensorBarometro.presion_1 != undefined) 
          senSmartCal1Fallo = this.equationPorcentajeError(sensorExt.cal1[0], sensorList[i].sensorBarometro.presion_1.presion);
        if (sensorList[i].sensorBarometro.presion_2 != undefined && sensorExt.cal2.length > 0) 
          senSmartCal2Fallo = this.equationPorcentajeError(sensorExt.cal2[0], sensorList[i].sensorBarometro.presion_2.presion);
      } else if(nameSensor == 'Micrófono') {
        if (sensorList[i].sensorMicrofono.calSonido_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorMicrofono.calSonido_1.min + sensorList[i].sensorMicrofono.calSonido_1.max) / 2;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        if (sensorList[i].sensorMicrofono.calSonido_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorMicrofono.calSonido_2.min + sensorList[i].sensorMicrofono.calSonido_2.max) / 2;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'Acelerómetro') {
        if (sensorList[i].sensorAcelerometro.aceleracion_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorAcelerometro.aceleracion_1.x + sensorList[i].sensorAcelerometro.aceleracion_1.y + sensorList[i].sensorAcelerometro.aceleracion_1.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        if (sensorList[i].sensorAcelerometro.aceleracion_2 != undefined && sensorExt.cal2.length > 0) {
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
        if (sensorList[i].sensorGiroscopio.rotacion_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorGiroscopio.rotacion_2.x + sensorList[i].sensorGiroscopio.rotacion_2.y + sensorList[i].sensorGiroscopio.rotacion_2.z) / 3;
          senSmartCal2Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'Magnetómetro') {
        if (sensorList[i].sensorMagnetometro.magnetismo_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1] + sensorExt.cal1[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorMagnetometro.magnetismo_1.x + sensorList[i].sensorMagnetometro.magnetismo_1.y + sensorList[i].sensorMagnetometro.magnetismo_1.z) / 3;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        if (sensorList[i].sensorMagnetometro.magnetismo_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1] + sensorExt.cal2[2]) / 3;
          mediaSmart_Cal = (sensorList[i].sensorMagnetometro.magnetismo_2.x + sensorList[i].sensorMagnetometro.magnetismo_2.y + sensorList[i].sensorMagnetometro.magnetismo_2.z) / 3;
          senSmartCal2Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
      } else if(nameSensor == 'GPS') {
        if (sensorList[i].sensorGPS.ubicacion_1 != undefined) {
          mediaSE_Cal = (sensorExt.cal1[0] + sensorExt.cal1[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorGPS.ubicacion_1.latitud + sensorList[i].sensorGPS.ubicacion_1.longitud) / 2;
          senSmartCal1Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
        }
        if (sensorList[i].sensorGPS.ubicacion_2 != undefined && sensorExt.cal2.length > 0) {
          mediaSE_Cal = (sensorExt.cal2[0] + sensorExt.cal2[1]) / 2;
          mediaSmart_Cal = (sensorList[i].sensorGPS.ubicacion_2.latitud + sensorList[i].sensorGPS.ubicacion_2.longitud) / 2;
          senSmartCal2Fallo = this.equationPorcentajeError(mediaSE_Cal, mediaSmart_Cal);
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
      if (media != null) {
        sensorFalloMediaCalculada[contDatoResult] = {
          modelo: sensorList[i].modelo,
          marca: sensorList[i].fabricante,
          fallo: media,
        };
        contDatoResult++;
      }
      //console.log(nameSensor + "\nFallo Cal1: " + senSmartCal1Fallo + "\nFallo Cal2: " + senSmartCal2Fallo + "\nMedia: " + media);
    }
    //console.log(sensorList);
    return sensorFalloMediaCalculada;
  }

  smartphoneMenosFallos(sensorMediaFalloCalculada: [{modelo: string; marca: string; fallo: any;}]) {
    sensorMediaFalloCalculada.sort(function (a, b) {
      return (a.fallo - b.fallo)
    })
    return sensorMediaFalloCalculada;
  }

  mediaModelMarcaDuplicados(sensorFalloMediaCalculada: [{modelo: string; marca: string; fallo: number;}], isMarcaModel: string) {
    let objectsUniques: { modelo: string; marca: string; fallo: number; }[] = [];
    let modelMarcaUnique: string[] = [];

    let valueIsMarcaModel = '';
    let mediaMarcaModelo = NaN;
    let contLengthMedia = 0;
    let dataObjects: [{modelo: string; marca: string; fallo: number;}] = [{modelo: '', marca: '', fallo: NaN,}];

    //Obtener modelos o marcas unicas
    sensorFalloMediaCalculada.forEach(function(elemento, indice, array) {
      // Discriminación de elementos iguales
      if(isMarcaModel == 'marca' && (objectsUniques.find(p=>p.marca.toLowerCase() == elemento.marca.toLowerCase()) == undefined)) objectsUniques.push(elemento);
      else if(isMarcaModel == 'modelo' && (objectsUniques.find(p=>p.modelo.toLowerCase() == elemento.modelo.toLowerCase()) == undefined)) objectsUniques.push(elemento);
    })
    objectsUniques.forEach(function(elemento, indice) {
      if (isMarcaModel == 'marca') modelMarcaUnique[indice] = elemento.marca.toUpperCase();
      else if (isMarcaModel == 'modelo') modelMarcaUnique[indice] = elemento.modelo.toUpperCase();
    });

    // Media para Marcas o modelos
    modelMarcaUnique.forEach(function(elemento, indice) {
      sensorFalloMediaCalculada.forEach(dato => {
        if (dato.fallo != null) {
          if (isMarcaModel == 'marca') valueIsMarcaModel = dato.marca.toUpperCase();
          else if (isMarcaModel == 'modelo') valueIsMarcaModel = dato.modelo.toUpperCase();

          if (elemento == valueIsMarcaModel) {
            if(isNaN(mediaMarcaModelo)) mediaMarcaModelo = 0;
            mediaMarcaModelo += dato.fallo;
            //console.log(mediaMarcaModelo);
            contLengthMedia++;
          }
        }
      });

      mediaMarcaModelo /= contLengthMedia; //obteniendo datos con % error
      

      dataObjects[indice] = {
        modelo: objectsUniques[indice].modelo,
        marca: objectsUniques[indice].marca,
        fallo: mediaMarcaModelo,
      };
      
      mediaMarcaModelo = NaN;
      contLengthMedia = 0;
    });

    //console.log(dataObjects);
    return dataObjects;
  }
}
