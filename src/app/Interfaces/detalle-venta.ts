/**
 * Interface que define el detalle de una venta
 * 
 * @param {number} idProducto - Identificador del producto
 * @param {string} descripcionProducto - Descripcion del producto
 * @param {number} cantidad - Cantidad de productos
 * @param {string} precioTexto - Precio del producto
 * @param {string} totalTexto - Total de la venta
 */
export interface DetalleVenta {
    idProducto: number,
    descripcionProducto: string,
    cantidad: number,
    precioTexto: string,
    totalTexto: string
}
