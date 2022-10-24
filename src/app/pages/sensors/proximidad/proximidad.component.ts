import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';

@Component({
  selector: 'app-proximidad',
  templateUrl: './proximidad.component.html',
  styleUrls: ['./proximidad.component.css']
})
export class ProximidadComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Proximidad";
  }

}
