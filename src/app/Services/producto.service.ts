import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

import { Producto } from '../Interfaces/producto';

/**
 * Servicio para los productos
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /**
   * URL de la API
   */
  private urlApi: string = environment.endpoint + "Producto/";

  /**
   * Constructor del servicio
   * 
   * @param {HttpClient} http Propiedad para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de productos
   * 
   * @returns {Observable<ResponseApi>} Lista de productos
   */
  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }

  /**
   * Obtiene un producto
   * 
   * @param {number} id Identificador del producto
   * @returns {Observable<ResponseApi>} Producto
   */
  guardar(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)
  }

  /**
   * Edita un producto
   * 
   * @param {Producto} request Producto a editar
   * @returns {Observable<ResponseApi>} Producto editado
   */
  editar(request: Producto): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
  }

  /**
   * Elimina un producto
   * 
   * @param {number} id Identificador del producto
   * @returns {Observable<ResponseApi>} Producto eliminado
   */
  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
  }

}
