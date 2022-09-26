import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AcelerometroComponent } from './pages/sensors/acelerometro/acelerometro.component';
import { ProximidadComponent } from './pages/sensors/proximidad/proximidad.component';
import { LuzComponent } from './pages/sensors/luz/luz.component';
import { GiroscopioComponent } from './pages/sensors/giroscopio/giroscopio.component';
import { MagnetometroComponent } from './pages/sensors/magnetometro/magnetometro.component';
import { PodometroComponent } from './pages/sensors/podometro/podometro.component';
import { CamaraComponent } from './pages/sensors/camara/camara.component';
import { BarometroComponent } from './pages/sensors/barometro/barometro.component';
import { GpsComponent } from './pages/sensors/gps/gps.component';
import { MicrofonoComponent } from './pages/sensors/microfono/microfono.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AcelerometroComponent,
    ProximidadComponent,
    LuzComponent,
    GiroscopioComponent,
    MagnetometroComponent,
    PodometroComponent,
    CamaraComponent,
    BarometroComponent,
    GpsComponent,
    MicrofonoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
