import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ValueChangeEvent } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import { ModalDetalleVentaComponent } from '../../Modales/modal-detalle-venta/modal-detalle-venta.component';

import { Venta } from '../../../../Interfaces/venta';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

/**
 * Formato de fecha personalizado
 */
export const MY_DATA_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMMM YYYY' }
}

/**
 * Componente para página de historial de ventas 
 */
@Component({
  selector: 'app-historial-venta',
  //imports: [],
  templateUrl: './historial-venta.component.html',
  styleUrl: './historial-venta.component.css',
  standalone: false,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }  //Usa el formato de fecha personalizado
  ]
})
export class HistorialVentaComponent implements OnInit, AfterViewInit {

  formularioBusqueda: FormGroup;  //Formulario de busqueda
  opcionesBusqueda: any[] = [ //Opciones de busqueda
    { value: 'fecha', descripcion: 'Por fechas' },
    { value: 'numero', descripcion: 'Numero venta' }
  ];
  columnasTabla: string[] = ['fechaRegistro', 'numeroDocumento', 'tipoPago', 'total', 'accion'];  //Columnas de la tabla
  dataInicio: Venta[] = []; //Datos de la tabla
  datosListaVenta = new MatTableDataSource(this.dataInicio);  //Datos de la tabla
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;  //Paginacion de la tabla

  /**
   * Constructor
   * @param fb
   * @param dialog
   * @param _ventaServicio
   * @param _utilidadServicio
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioBusqueda = this.fb.group({ //Inicializa el formulario de busqueda
      buscarPor: ['fecha'],
      numero: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });

    this.formularioBusqueda.get('buscarPor')?.valueChanges.subscribe(value => { //Detecta el cambio de la opcion de busqueda
      this.formularioBusqueda.patchValue({  //Reinicia los valores del formulario
        numero: '',
        fechaInicio: '',
        fechaFin: ''
      })
    });

  }

  ngOnInit(): void { 

  }
  
  ngAfterViewInit(): void { //Se ejecuta despues de que se renderiza la vista
    this.datosListaVenta.paginator = this.paginacionTabla; //Asigna la paginacion a la tabla
  }

  /**
   * Aplica el filtro a la tabla
   * @param event
   */
  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; //Obtiene el valor del filtro
    this.datosListaVenta.filter = filterValue.trim().toLocaleLowerCase(); //Aplica el filtro a la tabla
  }

  /**
   * Busca las ventas segun el criterio de busqueda
   */
  buscarVentas() {
    let _fechaInicio: string = '';
    let _fechaFin: string = '';

    if (this.formularioBusqueda.value.buscarPor === 'fecha') {  //Si la busqueda es por fecha
      _fechaInicio = moment(this.formularioBusqueda.value.fechaInicio).format('DD/MM/YYYY');  //Obtiene la fecha de inicio
      _fechaFin = moment(this.formularioBusqueda.value.fechaFin).format('DD/MM/YYYY');  //Obtiene la fecha de fin

      if (_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date') {  //Si no se ingresaron las fechas
        this._utilidadServicio.mostrarAlerta('Debe ingresar ambas fechas', 'Oops!');  //Muestra una alerta
        return;
      }
    }

    this._ventaServicio.historial(  //Obtiene el historial de ventas
      this.formularioBusqueda.value.buscarPor,  
      this.formularioBusqueda.value.numero,
      _fechaInicio,
      _fechaFin
    ).subscribe({   //Se suscribe al observable
      next: (data) => { //Si se obtuvieron los datos
        if (data.status) this.datosListaVenta = data.value; //Asigna los datos a la tabla si se obtuvieron datos
        else this._utilidadServicio.mostrarAlerta('No se encontraron datos', 'Oops!');  //Muestra una alerta si no se encontraron datos
      },
      error:(e)=>{} //Si hubo un error
    });

  }

  /**
   * Abre el modal de detalle de venta
   * @param _venta
   */
  verDetalleVenta(_venta:Venta){
    this.dialog.open(ModalDetalleVentaComponent,{
      data:_venta,
      disableClose:true,
      width:'700px'
    })
  }

}
