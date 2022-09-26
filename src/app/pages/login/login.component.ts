import { Component, OnInit } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private nameSensorService: NameSensorService) { }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "login";
  }

}
