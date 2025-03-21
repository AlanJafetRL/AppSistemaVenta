import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from '../../../../Interfaces/producto';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'; //Para mostrar alertas

/**
 * Componente para página de productos
 */
@Component({
  selector: 'app-producto',
  //imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
  standalone: false
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones']; //Columnas de la tabla
  dataInicio: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio); 
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;  //Paginacion de la tabla. Omite valores null o no definidos

  constructor(
    private dialog: MatDialog,  
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService  
  ) { }

  /**
   * Obtiene los productos
   */
  obtenerProductos() {
    this._productoServicio.lista().subscribe({  //Obtiene la lista de productos
      next: (data) => {
        if (data.status) this.dataListaProductos.data = data.value; //Asigna los datos a la tabla
        else
          this._utilidadServicio.mostrarAlerta('No se encontraron datos', 'Oops!'); //Muestra alerta si no hay datos
      },
      error: (e) => { } //Cuando hay un error
    });
  }

  ngOnInit(): void {  //Se ejecuta al iniciar el componente
    this.obtenerProductos();  //Obtiene los productos
  }

  ngAfterViewInit(): void { //Se ejecuta despues de que se renderiza la vista
    this.dataListaProductos.paginator = this.paginacionTabla; //Asigna la paginacion a la tabla
  }

  /**
   * Aplica el filtro a la tabla
   * @param event evento
   */
  aplicarFiltroTabla(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value; //Obtiene el valor del input
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();  //Aplica el filtro a la tabla
  }

  /**
   * Abre el modal para agregar un nuevo producto
   */
  nuevoProducto() {
    this.dialog.open(ModalProductoComponent, {  //Abre el modal
      disableClose: true  //No se puede cerrar
    }).afterClosed().subscribe(resultado => { //Se suscribe al observable
      if (resultado == 'true') this.obtenerProductos(); //Si se agrego un producto, obtiene los productos
    });
  }

  /**
   * Abre el modal para editar un producto
   * @param producto producto a editar
   */
  editarProducto(producto: Producto) {  
    this.dialog.open(ModalProductoComponent, {  //Abre el modal
      disableClose: true, //No se puede cerrar
      data: producto  //Envia el producto a editar
    }).afterClosed().subscribe(resultado => { //Se suscribe al observable
      if (resultado == 'true') this.obtenerProductos(); //Si se edito un producto, obtiene los productos
    });
  }

  /**
   * Elimina un producto
   * @param producto producto a eliminar
   */
  eliminarProducto(producto: Producto) {
    Swal.fire({ //Muestra una alerta
      title: '¿Desea eliminar el producto',
      text: producto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
      theme: 'auto',
    }).then((resultado) => {  //Se suscribe al observable
      if (resultado.isConfirmed) {  //Si se confirma la eliminacion
        this._productoServicio.eliminar(producto.idProducto).subscribe({  //Elimina el producto
          next: (data) => {
            if (data.status) {  //Si se eliminó el producto
              this._utilidadServicio.mostrarAlerta('El producto fue eliminado', 'Listo'); //Muestra una alerta
              this.obtenerProductos();  //Obtiene los productos 
            } else this._utilidadServicio.mostrarAlerta('No se pudo eliminar el producto', 'Error');  //Muestra una alerta si no se pudo eliminar
          },
          error: (e) => { }
        })
      }
    })
  }

}
