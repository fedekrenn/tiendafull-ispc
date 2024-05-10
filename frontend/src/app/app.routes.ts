import { Routes } from '@angular/router';
import { GaleriaProductosComponent } from './components/galeria-productos/galeria-productos.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { Pagina404Component } from './components/pagina-404/pagina-404.component';

export const routes: Routes = [
    {path:"Home", component:LandingPageComponent},
    {path:"Productos", component:GaleriaProductosComponent},
    {path:"Detalle", component:ProductoComponent},
    {path:"Login", component:LoginPageComponent},
    {path:"Registro", component:RegistroComponent},
    {path:"Dashboard", component:CustomerDashboardComponent},
    {path:"", redirectTo:"/Home", pathMatch:"full"},
    {path:"**", component:Pagina404Component}

    
];
