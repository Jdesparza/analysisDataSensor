import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnalysisDataSensor';
  sideNavStatus: boolean = false;

  isLogin: boolean = false;

  constructor(private authService: AuthService) { 
    this.authService.stateAuth().subscribe(res => {
      if (res?.uid != null) {
        this.isLogin = true;
        //console.log(res?.uid);
      } else {
        this.isLogin = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
