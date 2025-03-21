import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

import { Login } from '../Interfaces/login';
import { Usuario } from '../Interfaces/usuario';

/**
 * Servicio para los usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
   * URL de la API
   */
  private urlApi:string=environment.endpoint+"Usuario/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http:HttpClient) { }

  /**
   * Inicia la sesión del usuario
   * 
   * @param {Login} request Datos del usuario
   * @returns {Observable<ResponseApi>} Resultado de la petición
   */
  iniciarSesion(request:Login):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}IniciarSesion`,request)
  }

  /**
   * Obtiene la lista de usuarios
   * 
   * @returns {Observable<ResponseApi>} Lista de usuarios
   */
  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }

  /**
   * Obtiene un usuario
   * 
   * @param {number} id Identificador del usuario
   * @returns {Observable<ResponseApi>} Usuario
   */
  guardar(request:Usuario):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
  }

  /**
   * Edita un usuario
   * 
   * @param {Usuario} request Usuario a editar
   * @returns {Observable<ResponseApi>} Usuario editado
   */
  editar(request:Usuario):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
  }

  /**
   * Elimina un usuario
   * 
   * @param {number} id Identificador del usuario
   * @returns {Observable<ResponseApi>} Usuario eliminado
   */
  eliminar(id:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
  }

}
