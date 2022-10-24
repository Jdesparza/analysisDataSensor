import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';

@Component({
  selector: 'app-microfono',
  templateUrl: './microfono.component.html',
  styleUrls: ['./microfono.component.css']
})
export class MicrofonoComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Micrófono";
  }

}
