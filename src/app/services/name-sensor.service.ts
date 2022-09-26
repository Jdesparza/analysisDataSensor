import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameSensorService {

  nombreSensor: string = '';

  constructor() { }
}
