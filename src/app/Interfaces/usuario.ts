/**
 * Interface que define el modelo de datos de Usuario
 * 
 * @param {number} idUsuario - Identificador del usuario
 * @param {string} nombreCompleto - Nombre completo del usuario
 * @param {string} correo - Correo del usuario
 * @param {number} idRol - Identificador del rol
 * @param {string} rolDescripcion - Descripción del rol
 * @param {string} clave - Clave del usuario
 * @param {number} esActivo - Estado del usuario
 */
export interface Usuario {
    idUsuario:number,
    nombreCompleto:string,
    correo:string,
    idRol:number,
    rolDescripcion:string,
    clave:string,
    esActivo:number
}
