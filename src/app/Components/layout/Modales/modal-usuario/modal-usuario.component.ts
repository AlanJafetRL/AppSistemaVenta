import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../Interfaces/rol';
import { Usuario } from '../../../../Interfaces/usuario';

import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

/**
 * Componente para el modal de usuario (formulario para agregar o editar un usuario)
 */
@Component({
  selector: 'app-modal-usuario',
  standalone: false,
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.scss'
})
export class ModalUsuarioComponent implements OnInit {

  formularioUsuario: FormGroup; // Variable para el formulario
  ocultarPassword: boolean = true;  // Variable para ocultar la contraseña
  tituloAccion: string = 'Agregar'; // Variable para el titulo del modal
  botonAccion: string = 'Guardar';  // Variable para el boton del modal
  listaRoles: Rol[] = []; // Variable para la lista de roles

  /**
   * Constructor del componente
   * @param modalActual Variable para el modal actual
   * @param datosUsuario Variable para los datos del usuario
   * @param fb Variable para el formulario
   * @param _rolServicio Variable para el servicio de rol
   * @param _usuarioServicio Variable para el servicio de usuario
   * @param _utilidadServicio Variable para el servicio de util
   */
  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,  // Se inyectan los datos del usuario
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioUsuario = this.fb.group({  // Se crea el formulario
      nombreCompleto: ['', Validators.required],  // Se asignan los campos del formulario
      correo: ['', Validators.required],
      idRol: ['', Validators.required],
      clave: ['', Validators.required],
      esActivo: ['1', Validators.required],
    });

    if (this.datosUsuario != null) {  // Si el usuario no es nulo
      this.tituloAccion = 'Editar'; // Se cambia el titulo del modal
      this.botonAccion = 'Actualizar';  // Se cambia el boton del modal
    }

    this._rolServicio.lista().subscribe({ // Se llama al metodo lista del servicio de rol
      next: (data) => { // Se obtiene la respuesta del servicio
        if (data.status) this.listaRoles = data.value // Si la respuesta es correcta se asigna la lista de roles
      },
      error: (e) => { } // Si hay un error
    });

  }

  ngOnInit(): void {  
    if (this.datosUsuario != null) {  // Si el usuario no es nulo
      this.formularioUsuario.patchValue({ // Se asignan los valores al formulario
        nombreCompleto: this.datosUsuario.nombreCompleto,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        clave: this.datosUsuario.clave,
        esActivo: this.datosUsuario.esActivo.toString()
      })
    }
  }

  /**
   * Metodo para guardar o editar un usuario
   */
  guardarEditar_Usuario() { 
    const _usuario: Usuario = { // Se crea el objeto usuario
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      correo: this.formularioUsuario.value.correo,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: '',
      clave: this.formularioUsuario.value.clave,
      esActivo: parseInt(this.formularioUsuario.value.esActivo),
    }

    if (this.datosUsuario == null) {  // Si el usuario es nulo
      this._usuarioServicio.guardar(_usuario).subscribe({ // Se llama al metodo guardar del servicio de usuario
        next: (data) => {
          if (data.status) {  // Se obtiene la respuesta del servicio
            this._utilidadServicio.mostrarAlerta('El usuario fue registrado', "Exito");
            this.modalActual.close('true')
          } else {
            this._utilidadServicio.mostrarAlerta('No se pudo registrar el usuario', 'Error');
          }
        },
        error: (e) => { }
      })
    } else {  // Si el usuario no es nulo
      this._usuarioServicio.editar(_usuario).subscribe({  // Se llama al metodo editar del servicio de usuario
        next: (data) => {
          if (data.status) {  // Se obtiene la respuesta del servicio
            this._utilidadServicio.mostrarAlerta('El usuario fue editado', "Exito");
            this.modalActual.close('true')
          } else {
            this._utilidadServicio.mostrarAlerta('No se pudo editar el usuario', 'Error');
          }
        },
        error: (e) => { }
      })
    }


  }


}
