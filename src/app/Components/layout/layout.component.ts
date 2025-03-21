import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from '../../Interfaces/menu';

import { MenuService } from '../../Services/menu.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';


@Component({
  selector: 'app-layout',
  //imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone:false
})
export class LayoutComponent implements OnInit {
  listaMenus:Menu[]=[];
  correoUsuario:string='';
  rolUsuario:string='';

  constructor(
    private router:Router,
    private _menuServicio:MenuService,
    private _utilidadServicio:UtilidadService
  ){}

  ngOnInit(): void {
      const usuario=this._utilidadServicio.obtenerSesionUsuario();

      if(usuario!= null){
        this.correoUsuario=usuario.correo;
        this.rolUsuario=usuario.rolDescripcion;

        this._menuServicio.lista(usuario.idUsuario).subscribe({
          next:(data)=>{
            if(data.status) this.listaMenus=data.value;
          },
          error:(e)=>{}
        });
      }
  }


  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

}
