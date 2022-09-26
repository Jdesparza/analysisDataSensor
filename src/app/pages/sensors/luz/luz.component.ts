import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-luz',
  templateUrl: './luz.component.html',
  styleUrls: ['./luz.component.css']
})
export class LuzComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensor Luz";
  }

}
