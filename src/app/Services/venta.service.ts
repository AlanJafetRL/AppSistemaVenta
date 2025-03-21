import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

import { Venta } from '../Interfaces/venta';

/**
 * Servicio para las ventas
 */
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  /**
   * URL de la API
   */
  private urlApi: string = environment.endpoint + "Venta/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Registra una venta
   * 
   * @param {Venta} request Datos de la venta
   * @returns {Observable<ResponseApi>} Respuesta de la petición HTTP
   */
  registrar(request: Venta): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registrar`, request)
  }

  /**
   * Obtiene la lista de ventas
   * 
   * @param {string} buscarPor Campo por el cual buscar
   * @param {string} numeroVenta Número de venta
   * @param {string} fechaInicio Fecha de inicio
   * @param {string} fechaFin Fecha de fin
   * @returns {Observable<ResponseApi>} Lista de ventas
   */
  historial(buscarPor: string, numeroVenta: string, fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
  }

  /**
   * Obtiene el reporte de ventas
   * 
   * @param {string} fechaInicio Fecha de inicio
   * @param {string} fechaFin Fecha de fin
   * @returns {Observable<ResponseApi>} Reporte de ventas
   */
  reporte(fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
  }

}
