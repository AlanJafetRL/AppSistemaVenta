/**
 * Interface para manejar la respuesta de la API
 * 
 * @param {boolean} status Estado de la respuesta
 * @param {string} msg Mensaje de la respuesta
 * @param {any} value Valor de la respuesta
 */
export interface ResponseApi {
    status: boolean,
    msg: string,
    value: any
}
