import { NgModule } from '@angular/core'; //Importa el modulo de angular
import { RouterModule, Routes } from '@angular/router'; //Importa el modulo de rutas
import { LoginComponent } from './Components/login/login.component';  //Importa el componente de login

/**
 * Rutas de la aplicación
 */
export const routes: Routes = [ 
  { path: '', component: LoginComponent, pathMatch: "full" }, //Ruta de inicio
  { path: 'login', component: LoginComponent, pathMatch: "full" },  //Ruta de login
  { path: 'pages', loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule) }, //Ruta de páginas
  { path: '**', redirectTo: 'login', pathMatch: "full" }  //Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //Importa las rutas de la aplicación 
  exports: [RouterModule] //Exporta las rutas de la aplicación
})
export class AppRoutingModule { }
 