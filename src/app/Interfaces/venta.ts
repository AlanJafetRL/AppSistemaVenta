import { DetalleVenta } from "./detalle-venta"

/**
 * Interface para la venta
 * 
 * @param {number} idVenta - Identificador de la venta
 * @param {string} numeroDocumento - Número de documento
 * @param {string} tipoPago - Tipo de pago
 * @param {string} fechaRegistro - Fecha de registro
 * @param {string} totalTexto - Total de la venta
 * @param {DetalleVenta[]} detalleVenta - Detalle de la venta
 */
export interface Venta {
    idVenta?:number,
    numeroDocumento?:string,
    tipoPago:string,
    fechaRegistro?:string,
    totalTexto:string,
    detalleVenta:DetalleVenta[]
}
