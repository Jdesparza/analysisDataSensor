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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'acelerometro',
    component: AcelerometroComponent,
    title: 'Sensor Acelerómetro'
  },
  {
    path: 'proximidad',
    component: ProximidadComponent,
    title: 'Sensor Proximidad'
  },
  {
    path: 'luz',
    component: LuzComponent,
    title: 'Sensor Luz'
  },
  {
    path: 'giroscopio',
    component: GiroscopioComponent
  },
  {
    path: 'magnetometro',
    component: MagnetometroComponent
  },
  {
    path: 'podometro',
    component: PodometroComponent
  },
  {
    path: 'camara',
    component: CamaraComponent
  },
  {
    path: 'barometro',
    component: BarometroComponent
  },
  {
    path: 'gps',
    component: GpsComponent
  },
  {
    path: 'microfono',
    component: MicrofonoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
