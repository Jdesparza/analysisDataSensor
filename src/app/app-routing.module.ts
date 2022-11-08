import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AcelerometroComponent } from './pages/sensors/acelerometro/acelerometro.component';
import { BarometroComponent } from './pages/sensors/barometro/barometro.component';
import { CamaraComponent } from './pages/sensors/camara/camara.component';
import { GiroscopioComponent } from './pages/sensors/giroscopio/giroscopio.component';
import { GpsComponent } from './pages/sensors/gps/gps.component';
import { LuzComponent } from './pages/sensors/luz/luz.component';
import { MagnetometroComponent } from './pages/sensors/magnetometro/magnetometro.component';
import { MicrofonoComponent } from './pages/sensors/microfono/microfono.component';
import { PodometroComponent } from './pages/sensors/podometro/podometro.component';
import { ProximidadComponent } from './pages/sensors/proximidad/proximidad.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { SensorsExternsComponent } from './pages/sensors-externs/sensors-externs.component';
import { TermometroComponent } from './pages/sensors/termometro/termometro.component';
import { RitmoCardiacoComponent } from './pages/sensors/ritmo-cardiaco/ritmo-cardiaco.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Acelerometro',
    component: AcelerometroComponent,
    title: 'Sensor Acelerómetro',
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Proximidad',
    component: ProximidadComponent,
    title: 'Sensor Proximidad',
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Luz',
    component: LuzComponent,
    title: 'Sensor Luz',
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Giroscopio',
    component: GiroscopioComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Magnetometro',
    component: MagnetometroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Podometro',
    component: PodometroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Camara',
    component: CamaraComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Barometro',
    component: BarometroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/GPS',
    component: GpsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Microfono',
    component: MicrofonoComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Termometro',
    component: TermometroComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'Sensor/Ritmo-Cardiaco',
    component: RitmoCardiacoComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  {
    path: 'Sensores-Externos',
    component: SensorsExternsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
