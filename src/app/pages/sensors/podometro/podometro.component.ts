import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-podometro',
  templateUrl: './podometro.component.html',
  styleUrls: ['./podometro.component.css']
})
export class PodometroComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Podómetro";
  }

}
