import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';

@Component({
  selector: 'app-barometro',
  templateUrl: './barometro.component.html',
  styleUrls: ['./barometro.component.css']
})
export class BarometroComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Barómetro";
  }

}
