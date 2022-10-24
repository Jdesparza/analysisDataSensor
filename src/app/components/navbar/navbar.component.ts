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
      route: 'acelerometro'
    },
    {
      number: '2',
      name: 'Proximidad',
      icon: 'ic_proximidad',
      route: 'proximidad'
    },
    {
      number: '3',
      name: 'Luz',
      icon: 'ic_luz',
      route: 'luz'
    },
    {
      number: '4',
      name: 'Giroscopio',
      icon: 'ic_giroscopio',
      route: 'giroscopio'
    },
    {
      number: '5',
      name: 'Magnetómetro',
      icon: 'ic_magnetometro',
      route: 'magnetometro'
    },
    {
      number: '6',
      name: 'Podómetro',
      icon: 'ic_podometro',
      route: 'podometro'
    },
    {
      number: '7',
      name: 'Cámara',
      icon: 'ic_camara',
      route: 'camara'
    },
    {
      number: '8',
      name: 'Barómetro',
      icon: 'ic_barometro',
      route: 'barometro'
    },
    {
      number: '9',
      name: 'GPS',
      icon: 'ic_gps',
      route: 'gps'
    },
    {
      number: '10',
      name: 'Micrófono',
      icon: 'ic_microfono',
      route: 'microfono'
    },
  ];

  constructor(private nameSensorService: NameSensorService) {}

  ngOnInit(): void {}

  cargarNombreSensor(nombre: string) {
    //this.nameSensorService.nombreSensor = 'Sensor ' + nombre;
  }

}
