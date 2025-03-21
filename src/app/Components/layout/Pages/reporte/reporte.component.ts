import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ValueChangeEvent } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';  //Para manejar fechas

import * as XLSX from 'xlsx'; //Para exportar a excel

import { Reporte } from '../../../../Interfaces/reporte';
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
 * Componente para página de reporte
 */
@Component({
  selector: 'app-reporte',
  //imports: [],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  standalone: false,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }  //Usa el formato de fecha personalizado
  ]
})
export class ReporteComponent implements OnInit {

  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro', 'numeroVenta', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProducto'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioFiltro = this.fb.group({ //Formulario de filtro
      fechaInicio: ['', Validators.required], 
      fechaFin: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void { //Se ejecuta despues de que se renderiza la vista
    this.dataVentaReporte.paginator = this.paginacionTabla; //Asigna la paginacion a la tabla
  }

  /**
   * Busca las ventas
   */
  buscarVentas() {
    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');  
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    if (_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date') {  //Si no se ingresan las fechas
      this._utilidadServicio.mostrarAlerta('Debe ingresar ambas fechas', 'Oops!');  //Muestra alerta
      return;
    }

    this._ventaServicio.reporte(  //Obtiene el reporte
      _fechaInicio,
      _fechaFin
    ).subscribe({ //Cuando se obtiene la respuesta
      next: (data) => { 
        if (data.status) {  //Si la respuesta es correcta
          this.listaVentasReporte = data.value; //Asigna los datos a la tabla
          this.dataVentaReporte.data = data.value;
        } else {  //Si no hay datos
          this.listaVentasReporte = []; //Reinicia los datos
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostrarAlerta('No se encontraron datos', 'Oops!'); //Muestra alerta
        }
      },
      error: (e) => { } //Cuando hay un error
    });

  }

  /**
   * Exporta el reporte a excel
   */
  exportarExcel() {
    const wb = XLSX.utils.book_new(); //Crea un libro de excel
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte); //Convierte los datos a hoja de excel

    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');  //Agrega la hoja al libro
    XLSX.writeFile(wb, 'Reporte Ventas.xlsx') //Guarda el archivo

  }


}
