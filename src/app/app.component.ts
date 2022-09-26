import { Component } from '@angular/core';
import { NameSensorService } from './services/name-sensor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnalysisDataSensor';
  sideNavStatus: boolean = false;

  constructor(public nameSensorService: NameSensorService) { 
  }

  ngOnInit(): void {
  }
}
