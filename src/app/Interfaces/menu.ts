/**
 * Interface que define la estructura de un menú
 * 
 * @param {number} idMenu - Identificador del menú
 * @param {string} nombre - Nombre del menú
 * @param {string} icono - Icono del menú
 * @param {string} url - Url del menú
 */
export interface Menu {
    idMenu: number,
    nombre: string,
    icono: string,
    url: string
}
