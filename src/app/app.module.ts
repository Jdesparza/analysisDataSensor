import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { SensorsExternsComponent } from './pages/sensors-externs/sensors-externs.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    SensorsExternsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
