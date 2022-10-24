import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';

@Component({
  selector: 'app-giroscopio',
  templateUrl: './giroscopio.component.html',
  styleUrls: ['./giroscopio.component.css']
})
export class GiroscopioComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Giroscopio";
  }

}
