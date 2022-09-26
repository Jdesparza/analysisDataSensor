import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NameSensorService } from 'src/app/services/name-sensor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  constructor(public nameSensorService: NameSensorService) { }

  ngOnInit(): void {
  }

  SideNavToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
}
