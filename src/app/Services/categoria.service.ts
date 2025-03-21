import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

/**
 * Servicio para las categorías
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  /**
   * URL de la API
   */
  private urlApi: string = environment.endpoint + "Categoria/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de categorías
   * 
   * @returns {Observable<ResponseApi>} Lista de categorías
   */
  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }

}
