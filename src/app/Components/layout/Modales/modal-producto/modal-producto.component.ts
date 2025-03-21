import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from '../../../../Interfaces/categoria';
import { Producto } from '../../../../Interfaces/producto';
import { CategoriaService } from '../../../../Services/categoria.service';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

/**
 * Componente para el modal de producto (formulario para agregar o editar un producto)
 */
@Component({
  selector: 'app-modal-producto', 
  standalone: false,  
  templateUrl: './modal-producto.component.html', 
  styleUrl: './modal-producto.component.scss' 
})
export class ModalProductoComponent implements OnInit {
  formularioProducto: FormGroup;  // Variable para el formulario
  tituloAccion: string = 'Agregar'; // Variable para el titulo del modal
  botonAccion: string = 'Guardar';  // Variable para el boton del modal
  listaCategorias: Categoria[] = [];  // Variable para la lista de categorias


  /**
   * Constructor del componente
   * @param modalActual Variable para el modal actual
   * @param datosProducto Variable para los datos del producto
   * @param fb Variable para el formulario
   * @param _categoriaServicio Variable para el servicio de categoria
   * @param _productoServicio Variable para el servicio de producto
   * @param _utilidadServicio Variable para el servicio de util
   */
  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,  
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,  // Se inyectan los datos del producto
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService, 
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({ // Se crea el formulario
      nombre: ['', Validators.required],  // Se asignan los campos del formulario
      idCategoria: ['', Validators.required], 
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      esActivo: ['1', Validators.required],
    });

    if (this.datosProducto != null) { // Si el producto no es nulo
      this.tituloAccion = 'Editar'; // Se cambia el titulo del modal
      this.botonAccion = 'Actualizar';  // Se cambia el boton del modal
    }

    this._categoriaServicio.lista().subscribe({ // Se llama al metodo lista del servicio de categoria
      next: (data) => { // Se obtiene la respuesta del servicio
        if (data.status) this.listaCategorias = data.value; // Si la respuesta es correcta se asigna la lista de categorias
      },
      error: (e) => { } // Si hay un error
    });

  }

  ngOnInit(): void {
    if (this.datosProducto != null) { // Si el producto no es nulo
      this.formularioProducto.patchValue({  // Se asignan los valores al formulario
        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,  
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo: this.datosProducto.esActivo.toString()  
      })
    }
  }

  /**
   * Metodo para guardar o editar un producto
   */
  guardarEditar_Producto() {
    const _producto: Producto = { // Se crea un objeto de tipo Producto
      idProducto: this.datosProducto == null ? 0 : this.datosProducto.idProducto, // Si el producto es nulo se le asigna 0, de lo contrario se le asigna el id del producto
      nombre: this.formularioProducto.value.nombre,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: '',
      precio: this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      esActivo: parseInt(this.formularioProducto.value.esActivo)
    }

    if (this.datosProducto == null) { // Si el producto es nulo se guarda el producto
      this._productoServicio.guardar(_producto).subscribe({ // Se llama al metodo guardar del servicio de producto
        next: (data) => { // Se obtiene la respuesta del servicio
          if (data.status) {  // Si la respuesta es correcta
            this._utilidadServicio.mostrarAlerta('El producto fue registrado', "Exito");  // Se muestra una alerta
            this.modalActual.close('true')  // Se cierra el modal
          } else {  // Si la respuesta es incorrecta
            this._utilidadServicio.mostrarAlerta('No se pudo registrar el producto', 'Error');  // Se muestra una alerta
          }
        },
        error: (e) => { } // Si hay un error
      })
    } else {  // Si el producto no es nulo se edita el producto
      this._productoServicio.editar(_producto).subscribe({  // Se llama al metodo editar del servicio de producto
        next: (data) => { // Se obtiene la respuesta del servicio
          if (data.status) {  // Si la respuesta es correcta
            this._utilidadServicio.mostrarAlerta('El producto fue editado', "Exito"); // Se muestra una alerta
            this.modalActual.close('true')  // Se cierra el modal
          } else {  // Si la respuesta es incorrecta
            this._utilidadServicio.mostrarAlerta('No se pudo editar el producto', 'Error'); // Se muestra una alerta
          }
        },
        error: (e) => { } // Si hay un error
      })
    }
  }



}
