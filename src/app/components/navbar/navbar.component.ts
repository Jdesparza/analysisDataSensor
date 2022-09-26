import { Component, Input, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  @Input() nombreSensor: string = "";

  list = [
    {
      number: '1',
      name: 'Acelerómetro',
      icon: 'fa-solid fa-house',
      route: 'acelerometro'
    },
    {
      number: '2',
      name: 'Proximidad',
      icon: 'fa-solid fa-house',
      route: 'proximidad'
    },
    {
      number: '3',
      name: 'Luz',
      icon: 'fa-solid fa-house',
      route: 'luz'
    },
    {
      number: '4',
      name: 'Giroscopio',
      icon: 'fa-solid fa-house',
      route: 'giroscopio'
    },
    {
      number: '5',
      name: 'Magnetómetro',
      icon: 'fa-solid fa-house',
      route: 'magnetometro'
    },
    {
      number: '6',
      name: 'Podómetro',
      icon: 'fa-solid fa-house',
      route: 'podometro'
    },
    {
      number: '7',
      name: 'Cámara',
      icon: 'fa-solid fa-house',
      route: 'camara'
    },
    {
      number: '8',
      name: 'Barómetro',
      icon: 'fa-solid fa-house',
      route: 'barometro'
    },
    {
      number: '9',
      name: 'GPS',
      icon: 'fa-solid fa-house',
      route: 'gps'
    },
    {
      number: '10',
      name: 'Micrófono',
      icon: 'fa-solid fa-house',
      route: 'microfono'
    },
  ];

  constructor(private nameSensorService: NameSensorService) {}

  ngOnInit(): void {}

  cargarNombreSensor(nombre: string) {
    //this.nameSensorService.nombreSensor = 'Sensor ' + nombre;
  }

}
