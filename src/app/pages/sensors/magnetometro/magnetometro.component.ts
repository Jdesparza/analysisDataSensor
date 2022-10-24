import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';

@Component({
  selector: 'app-magnetometro',
  templateUrl: './magnetometro.component.html',
  styleUrls: ['./magnetometro.component.css']
})
export class MagnetometroComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Magnetómetro";
  }

}
