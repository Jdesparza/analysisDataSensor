import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-acelerometro',
  templateUrl: './acelerometro.component.html',
  styleUrls: ['./acelerometro.component.css']
})
export class AcelerometroComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Acelerómetro";
  }

}
