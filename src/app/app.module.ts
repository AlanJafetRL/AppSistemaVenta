import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './Reutilizable/shared/shared.module';
import { ModalProductoComponent } from './Component/Layout/Modales/modal-producto/modal-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalProductoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
