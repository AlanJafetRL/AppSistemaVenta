import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from '../../../../Services/producto.service';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { Producto } from '../../../../Interfaces/producto';
import { Venta } from '../../../../Interfaces/venta';
import { DetalleVenta } from '../../../../Interfaces/detalle-venta';

import Swal from 'sweetalert2'; //Para mostrar alertas

/**
 * Componente para página de venta
 */
@Component({
  selector: 'app-venta',
  //imports: [],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css',
  standalone: false
})
export class VentaComponent implements OnInit {

  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];

  listaProductosParaVenta: DetalleVenta[]=[];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!: Producto;
  tipodePagoPorDefecto: string = 'Efectivo';
  totalPagar: number = 0;

  formularioProductoVenta: FormGroup;
  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total', 'accion'];
  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta); 

  /**
   * Retorna los productos por filtro
   * @param busqueda nombre o producto 
   * @returns productos
   */
  retornarProductosPorFiltro(busqueda: any): Producto[] {
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase() : busqueda.nombre.toLocaleLowerCase(); //Convierte a minusculas el valor buscado

    return this.listaProductos.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado));  //Filtra los productos por nombre
  }

  constructor(
    private fb: FormBuilder,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    

    this.formularioProductoVenta = this.fb.group({  //Formulario de venta
      producto: ['', Validators.required],
      cantidad: ['', Validators.required]
    });

    this._productoServicio.lista().subscribe({  //Obtiene la lista de productos
      next: (data) => {
        if (data.status) {  //Cuando se obtiene la respuesta
          const lista = data.value as Producto[]; //Asigna los datos a la lista
          this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock > 0);  //Filtra los productos activos y con stock
        }
      },
      error: (e) => { } //Cuando hay un error
    })

    this.formularioProductoVenta.get('producto')?.valueChanges.subscribe(value => { //Detecta el cambio del producto en el formulario 
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value); //Filtra los productos 
    })


  }

  ngOnInit(): void {

  }

  /**
   * Muestra el producto
   * @param producto producto
   * @returns nombre del producto
   */
  mostrarProducto(producto: Producto): string { 
    return producto.nombre; //Retorna el nombre del producto
  }

  /**
   * Selecciona el producto para la venta
   * @param event evento
   */
  productoParaVenta(event: any) {
    this.productoSeleccionado = event.option.value; //Asigna el producto seleccionado
  }

  /**
   * Agrega el producto para la venta
   */
  agregarProductoParaVenta() {
    const _cantidad: number = this.formularioProductoVenta.value.cantidad;  //Obtiene la cantidad 
    const _precio: number = parseFloat(this.productoSeleccionado.precio); //Obtiene el precio 
    const _total: number = _cantidad * _precio; //Calcula el total 
    this.totalPagar = this.totalPagar + _total; //Calcula el total a pagar

    this.listaProductosParaVenta.push({ //Agrega el producto a la lista de productos para la venta
      idProducto: this.productoSeleccionado.idProducto, 
      descripcionProducto: this.productoSeleccionado.nombre,
      cantidad: _cantidad,
      precioTexto: String(_precio.toFixed(2)),
      totalTexto: String(_total.toFixed(2))
    })

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);  //Asigna los datos a la tabla de productos para la venta

    this.formularioProductoVenta.patchValue({   //Reinicia los valores del formulario de venta
      producto: '', 
      cantidad: '' 
    })

  }

  /**
   * Elimina el producto de la venta
   * @param detalle detalle de la venta
   */
  eliminarProducto(detalle: DetalleVenta) {
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto); //Calcula el total a pagar restando el total del producto
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(p => p.idProducto != detalle.idProducto);  //Filtra los productos

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta); //Asigna los datos a la tabla de productos para la venta
  }

  /**
   * Registra la venta
   */
  registrarVenta() {
    if (this.listaProductosParaVenta.length > 0) {  //Si hay productos para la venta
      this.bloquearBotonRegistrar = true; //Bloquea el boton de registrar

      const request: Venta = {  //Crea la venta como objeto request
        tipoPago: this.tipodePagoPorDefecto,  
        totalTexto: String(this.totalPagar.toFixed(2)),
        detalleVenta: this.listaProductosParaVenta
      } 

      this._ventaServicio.registrar(request).subscribe({  //Registra la venta 
        next: (response) => { //Cuando se obtiene la respuesta
          if (response.status) {  //Si la respuesta es correcta
            this.totalPagar = 0.00; //Reinicia el total a pagar
            this.listaProductosParaVenta = [];  //Reinicia la lista de productos para la venta
            this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);  //Asigna los datos a la tabla de productos para la venta

            Swal.fire({ //Muestra una alerta
              icon: 'success',
              title: 'Venta Registrada',
              text: `Numero de venta: ${response.value.numeroDocumento}`,
              theme:'auto',
            })
          } else {
            this._utilidadServicio.mostrarAlerta('No se pudo registrar la venta', 'Oops');  //Muestra una alerta si no se pudo registrar la venta
          }
        },
        complete: () => { //Cuando se completa la operacion
          this.bloquearBotonRegistrar = false;  //Desbloquea el boton de registrar
        },
      });

    }
  }


}
