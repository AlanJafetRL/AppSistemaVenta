import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'; //Para mostrar alertas


/**
 * Componente para página de usuarios
 */
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
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;  //Paginacion de la tabla. Omite valores null o no definidos

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) { }

  /**
   * Obtiene los usuarios
   */
  obtenerUsuarios() {
    this._usuarioServicio.lista().subscribe({ //Obtiene la lista de usuarios
      next: (data) => { //Cuando se obtiene la respuesta
        if (data.status) this.dataListaUsuarios.data = data.value;  //Asigna los datos a la tabla
        else
          this._utilidadServicio.mostrarAlerta('No se encontraron datos', 'Oops!'); //Muestra alerta si no hay datos
      },
      error: (e) => { } //Cuando hay un error
    });
  }

  ngOnInit(): void {  //Se ejecuta al iniciar el componente
    this.obtenerUsuarios(); //Obtiene los usuarios
  }

  ngAfterViewInit(): void { //Se ejecuta despues de que se renderiza la vista
    this.dataListaUsuarios.paginator = this.paginacionTabla;  //Asigna la paginacion a la tabla
  }

  /**
   * Aplica el filtro a la tabla
   * @param event evento
   */
  aplicarFiltroTabla(event: Event) {  
    const filterValue = (event.target as HTMLInputElement).value; //Obtiene el valor del input
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase(); //Aplica el filtro a la tabla
  }

  /**
   * Abre el modal para agregar un nuevo usuario
   */
  nuevoUsuario() {
    this.dialog.open(ModalUsuarioComponent, { //Abre el modal
      disableClose: true  //No se puede cerrar
    }).afterClosed().subscribe(resultado => { //Se suscribe al observable
      if (resultado == 'true') this.obtenerUsuarios();  //Si se agrego un usuario, obtiene los usuarios
    });
  }

  /**
   * Abre el modal para editar un usuario
   * @param usuario usuario a editar
   */
  editarUsuario(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, { //Abre el modal
      disableClose: true,
      data: usuario //Envia el usuario a editar
    }).afterClosed().subscribe(resultado => { //Se suscribe al observable
      if (resultado == 'true') this.obtenerUsuarios();  //Si se edito un usuario, obtiene los usuarios
    });
  }

  /**
   * Elimina un usuario
   * @param usuario usuario a eliminar
   */
  eliminarUsuario(usuario: Usuario) {
    Swal.fire({ //Muestra una alerta
      title: '¿Desea eliminar el usuario',
      text: usuario.nombreCompleto,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
      theme: 'auto',
    }).then((resultado) => {  //Se suscribe al observable
      if (resultado.isConfirmed) {  //Si se confirma la eliminacion
        this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({ //Elimina el usuario
          next: (data) => { 
            if (data.status) {  
              this._utilidadServicio.mostrarAlerta('El usuario fue eliminado', 'Listo');  //Muestra una alerta
              this.obtenerUsuarios(); //Obtiene los usuarios
            } else this._utilidadServicio.mostrarAlerta('No se pudo eliminar el usuario', 'Error'); //Muestra una alerta si no se pudo eliminar
          },
          error: (e) => { } //Cuando hay un error
        })
      }
    })
  }



}
