import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

/**
 * Servicio para los roles
 */
@Injectable({
  providedIn: 'root'
})
export class RolService {

  /**
   * URL de la API
   */
  private urlApi:string=environment.endpoint+"Rol/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http:HttpClient) { }

  /**
   * Obtiene la lista de roles
   * 
   * @returns {Observable<ResponseApi>} Lista de roles
   */
  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }

}
