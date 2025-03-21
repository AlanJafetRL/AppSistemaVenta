/**
 * Interface para el reporte
 * 
 * @param {string} numeroDocumento - Número de documento
 * @param {string} tipoPago - Tipo de pago
 * @param {string} fechaRegistro - Fecha de registro
 * @param {string} totalVenta - Total de la venta
 * @param {string} producto - Producto
 * @param {number} cantidad - Cantidad
 * @param {string} precio - Precio
 * @param {string} total - Total
 */
export interface Reporte {
    numeroDocumento: string,
    tipoPago: string,
    fechaRegistro: string,
    totalVenta: string,
    producto: string,
    cantidad: number,
    precio: string,
    total: string
}
