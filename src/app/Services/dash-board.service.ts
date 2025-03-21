import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

/**
 * Servicio para el dashboard
 */
@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  /**
   * URL de la API
   */
  private urlApi: string = environment.endpoint + "DashBoard/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene el resumen del dashboard
   * 
   * @returns {Observable<ResponseApi>} Resumen del dashboard
   */
  resumen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Resumen`)
  }

}
