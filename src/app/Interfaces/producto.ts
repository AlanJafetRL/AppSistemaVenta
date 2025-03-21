/**
 * Interface para la creación de objetos de tipo Producto
 * 
 * @param {number} idProducto - Identificador del producto
 * @param {string} nombre - Nombre del producto
 * @param {number} idCategoria - Identificador de la categoría
 * @param {string} descripcionCategoria - Descripción de la categoría
 * @param {number} stock - Cantidad de productos en stock
 * @param {string} precio - Precio del producto
 * @param {number} esActivo - Estado del producto
 */
export interface Producto {
    idProducto: number,
    nombre: string,
    idCategoria: number,
    descripcionCategoria: string,
    stock: number,
    precio: string,
    esActivo: number
}
