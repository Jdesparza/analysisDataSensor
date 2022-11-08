import { Component, Input, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';


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
      icon: 'ic_acelerometro',
      route: 'Sensor/Acelerometro'
    },
    {
      number: '2',
      name: 'Proximidad',
      icon: 'ic_proximidad',
      route: 'Sensor/Proximidad'
    },
    {
      number: '3',
      name: 'Luz',
      icon: 'ic_luz',
      route: 'Sensor/Luz'
    },
    {
      number: '4',
      name: 'Giroscopio',
      icon: 'ic_giroscopio',
      route: 'Sensor/Giroscopio'
    },
    {
      number: '5',
      name: 'Magnetómetro',
      icon: 'ic_magnetometro',
      route: 'Sensor/Magnetometro'
    },
    {
      number: '6',
      name: 'Podómetro',
      icon: 'ic_podometro',
      route: 'Sensor/Podometro'
    },
    {
      number: '7',
      name: 'Cámara',
      icon: 'ic_camara',
      route: 'Sensor/Camara'
    },
    {
      number: '8',
      name: 'Barómetro',
      icon: 'ic_barometro',
      route: 'Sensor/Barometro'
    },
    {
      number: '9',
      name: 'GPS',
      icon: 'ic_gps',
      route: 'Sensor/GPS'
    },
    {
      number: '10',
      name: 'Micrófono',
      icon: 'ic_microfono',
      route: 'Sensor/Microfono'
    },
    {
      number: '11',
      name: 'Termómetro',
      icon: 'ic_termometro',
      route: 'Sensor/Termometro'
    },
    {
      number: '12',
      name: 'Ritmo Cardíaco',
      icon: 'ic_ritmo_cardiaco',
      route: 'Sensor/Ritmo-Cardiaco'
    }
  ];

  constructor(private nameSensorService: NameSensorService) {}

  ngOnInit(): void {}

  cargarNombreSensor(nombre: string) {
    //this.nameSensorService.nombreSensor = 'Sensor ' + nombre;
  }

}
