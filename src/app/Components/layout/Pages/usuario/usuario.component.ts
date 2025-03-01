import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { resourceLimits } from 'worker_threads';


@Component({
  selector: 'app-usuario',
  //imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
  standalone: false
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;  //Omite valores null o no definidos

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) { }

  obtenerUsuarios() {
    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.dataListaUsuarios.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta('No se encontraron daots', 'Oops!');
      },
      error: (e) => { }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario() {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado=>{
      if(resultado=='true') this.obtenerUsuarios();
    });
  }

  editarUsuario(usuario:Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data:usuario
    }).afterClosed().subscribe(resultado=>{
      if(resultado=='true') this.obtenerUsuarios();
    });
  }

  eliminarUsuario(usuario:Usuario) {
    Swal.fire({
      title:'¿Desea eliminar el usuario',
      text:usuario.nombreCompleto,
      icon:'warning',
      confirmButtonColor:'#3085d6',
      confirmButtonText:'Sí, eliminar',
      showCancelButton:true,
      cancelButtonColor:'#d33',
      cancelButtonText:'No, volver',
      theme:'auto',
    }).then((resultado)=>{
      if (resultado.isConfirmed){
        this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
          next:(data)=>{
            if(data.status){
              this._utilidadServicio.mostrarAlerta('El usuario fue eliminado','Listo');
              this.obtenerUsuarios();
            } else this._utilidadServicio.mostrarAlerta('No se pudo eliminar el usuario','Error');
          },
          error:(e)=>{}
        })
      }
    })
  }



}
