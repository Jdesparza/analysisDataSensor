import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  listSensors = [
    {
      id: '1',
      sensor: 'Acelerómetro',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'acelerometro'
    },
    {
      id: '2',
      sensor: 'Proximidad',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'proximidad'
    },
    {
      id: '3',
      sensor: 'Luz',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'luz'
    },
    {
      id: '4',
      sensor: 'Giroscopio',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'giroscopio'
    },
    {
      id: '5',
      sensor: 'Magnetómetro',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'magnetometro'
    },
    {
      id: '6',
      sensor: 'Podómetro',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'podometro'
    },
    {
      id: '7',
      sensor: 'Cámara',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'camara'
    },
    {
      id: '8',
      sensor: 'Barómetro',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'barometro'
    },
    {
      id: '9',
      sensor: 'GPS',
      analisis: 50,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'gps'
    },
    {
      id: '10',
      sensor: 'Micrófono',
      analisis: 99.99,
      icon: 'fa-solid fa-house',
      modelSmartphone: 'TECNO LD7',
      route: 'microfono'
    }
  ];

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Home";
  }

}
