import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';

/**
 * Servicio para funciones reutilizables
 */
@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  /**
   * Constructor del servicio
   * 
   * @param {MatSnackBar} _snackBar Propiedad para mostrar mensajes emergentes
   */
  constructor(private _snackBar: MatSnackBar) { }
  
  /**
   * Muestra un mensaje emergente
   * 
   * @param {string} mensaje Mensaje a mostrar
   * @param {string} tipo Tipo de mensaje
   */
  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, { 
      horizontalPosition: "end",  //
      verticalPosition: "top",
      duration: 3000
    });
  }

  /**
   * Guarda la sesión del usuario en el almacenamiento local
   * 
   * @param {Sesion} usuarioSesion Sesión del usuario
   */
  guardarSesionUsuario(usuarioSesion: Sesion) {
    localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
  }

  /**
   * Obtiene la sesión del usuario
   * 
   * @returns {Sesion} Sesión del usuario
   */
  obtenerSesionUsuario(){
    const dataCadena=localStorage.getItem("usuario");
    const usuario=JSON.parse(dataCadena!);

    return usuario;
  }

  /**
   * Elimina la sesión del usuario
   */
  eliminarSesionUsuario(){
    localStorage.removeItem("usuario");
  }

}
