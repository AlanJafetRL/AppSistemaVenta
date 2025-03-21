import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

/**
 * Servicio para el menú
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /**
   * URL de la API
   */
  private urlApi: string = environment.endpoint + "Menu/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }


  /**
   * Obtiene la lista de menús
   * 
   * @param {number} idUsuario Identificador del usuario
   * @returns {Observable<ResponseApi>} Lista de menús
   */
  lista(idUsuario: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista?idUsuario=${idUsuario}`)
  }
}
