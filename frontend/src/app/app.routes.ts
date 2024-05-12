import { Routes } from '@angular/router';
import { GaleriaProductosComponent } from './components/galeria-productos/galeria-productos.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { Pagina404Component } from './components/pagina-404/pagina-404.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { RecoverPasswordComponent } from './components/recoverpassword/recover-password.component';
import { DetailsComponent } from './components/customer-dashboard/details/details.component';
import { HistorialComponent } from './components/customer-dashboard/historial/historial.component';
import { EnvioComponent } from './components/customer-dashboard/envio/envio.component';
export const routes: Routes = [
  { path: 'Home', component: LandingPageComponent },
  { path: 'Productos', component: GaleriaProductosComponent },
  { path: 'Detalle/:id', component: ProductoComponent },
  { path: 'Login', component: LoginPageComponent },
  { path: 'Dashboard', component: CustomerDashboardComponent, children:[
    { path: 'Detalles', component: DetailsComponent },
    { path: 'Historial', component: HistorialComponent },
    { path: 'Envio', component: EnvioComponent },
  ] },
  { path: 'Registro', component: RegistroComponent },
  { path: 'RecoverPass', component: RecoverPasswordComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component: Pagina404Component },
];
