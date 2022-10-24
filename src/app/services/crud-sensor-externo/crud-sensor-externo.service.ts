import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudSensorExternoService {

  constructor(private firestore: Firestore) { }

  addSensorExterno(sensorExterno: any) {
    const sensor_externo_ref = collection(this.firestore, 'SensoresExternos');
    return addDoc(sensor_externo_ref, sensorExterno);
  }

  getSensorExterno(): Observable<any> {
    const sensor_externo_ref = collection(this.firestore, 'SensoresExternos');
    return collectionData(sensor_externo_ref, {idField : 'id'}) as Observable<any>;
  }

  updateSensorExterno(id: string, sensorExterno: any) {
    const sensor_externo_docRef = doc(this.firestore, `SensoresExternos/${id}`);
    return updateDoc(sensor_externo_docRef, sensorExterno);
  }

  deleteSensorExterno(sensorExterno: any) {
    const sensor_externo_docRef = doc(this.firestore, `SensoresExternos/${sensorExterno.id}`);
    return deleteDoc(sensor_externo_docRef);
  }
}
