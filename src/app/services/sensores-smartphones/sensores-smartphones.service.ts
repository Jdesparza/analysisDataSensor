import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensoresSmartphonesService {

  constructor(private firestore: Firestore) { }

  getSensorSmartphone(): Observable<any> {
    const sensor_externo_ref = collection(this.firestore, 'SensoresSmartphones');
    return collectionData(sensor_externo_ref, {idField : 'id'}) as Observable<any>;
  }

  getSensorSmartphoneExist(tipoSensor: string) {
    const sensor_externo_ref = collection(this.firestore, 'SensoresSmartphones');
    const q = query(sensor_externo_ref, where(`${tipoSensor}.isExists`, '==', true));
    return collectionData(q);
  }
}
