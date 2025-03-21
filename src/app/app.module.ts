import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { AppRoutingModule } from './app-routing.module';  //Importa el módulo de rutas de la aplicación
import { AppComponent } from './app.component'; //Importa el componente principal de la aplicación

import { SharedModule } from './Reutilizable/shared/shared.module'; //Importa el módulo de componentes reutilizables
import { ModalProductoComponent } from './Components/layout/Modales/modal-producto/modal-producto.component'; //Importa el componente de modal de producto


@NgModule({
  declarations: [
    AppComponent, //Declara el componente principal de la aplicación 
    ModalProductoComponent  //Declara el componente de modal de producto 
  ],
  imports: [
    CommonModule, //Importa el módulo de componentes comunes
    AppRoutingModule, //Importa el módulo de rutas de la aplicación
    SharedModule  //Importa el módulo de componentes reutilizables
  ],
  providers: [],
  bootstrap: [AppComponent] //Arranca la aplicación con el componente principal
})
export class AppModule { }
