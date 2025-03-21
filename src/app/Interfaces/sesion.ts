/**
 * Interface para el objeto Sesion
 * 
 * @param {number} idUsuario - Identificador del usuario
 * @param {string} nombreCompleto - Nombre completo del usuario
 * @param {string} correo - Correo del usuario
 * @param {string} rolDescripcion - Descripción del rol
 */
export interface Sesion {
    idUsuario: number,
    nombreCompleto: string,
    correo: string,
    rolDescripcion: string
}
