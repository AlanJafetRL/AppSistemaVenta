import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { Chart, ChartItem, registerables } from 'chart.js'
import { DashBoardService } from '../../../../Services/dash-board.service';
Chart.register(...registerables); //Para que funcione el grafico

import { isPlatformBrowser } from '@angular/common';  //Para que solo se ejecute cuando este en el navegador y no el el servidor

/**
 * Componente para página de dashboard
 */
@Component({
  selector: 'app-dash-board',
  //imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css',
  standalone: false,
})
export class DashBoardComponent implements AfterViewInit {
  totalIngresos: string = '0';
  totalVentas: string = '0';
  totalProductos: string = '0';
  
  /**
   * Constructor
   * @param _dashboardServicio servicio de dashboard
   * @param platformId detecta si está en navegador o servidor
   */
  constructor(
    private _dashboardServicio: DashBoardService,
    @Inject(PLATFORM_ID) private platformId:object
  ) { }

  ngAfterViewInit(): void { //Se ejecuta despues de que se renderiza la vista
    if (isPlatformBrowser(this.platformId)) { //Solo se ejecuta si está en navegador
      this._dashboardServicio.resumen().subscribe({ //Obtiene el resumen
        next: (data) => { //Cuando se obtiene la respuesta
          if (data.status) {  //Si la respuesta es correcta
            this.totalIngresos = data.value.totalIngresos;  //Asigna los valores
            this.totalVentas = data.value.totalVentas;
            this.totalProductos = data.value.totalProductos;

            const arrayData: any[] = data.value.ventasUltimaSemana; //Obtiene los datos de las ventas de la ultima semana

            const labelTemp = arrayData.map((value) => value.fecha);  //Obtiene las fechas
            const dataTemp = arrayData.map((value) => value.total); //Obtiene los totales

            this.mostrarGrafico(labelTemp, dataTemp); //Muestra el grafico
          }
        },
        error: (e) => { } //Cuando hay un error
      });
    }
  }

  /**
   * Muestra el grafico de barras
   * @param labelGrafico fechas
   * @param dataGrafico totales
   */
  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]) {

    const ctx: ChartItem = document.getElementById('chartBarras') as ChartItem; //Obtiene el elemento del grafico

    new Chart(ctx, {  //Crea el grafico
      type: 'bar',
      data: {
        labels: labelGrafico, //Asigna las fechas
        datasets: [{  //Asigna los datos
          label: '# de Ventas',
          data: dataGrafico,  //Asigna los totales
          backgroundColor: ['rgba(54,162,235,0.2)'],
          borderColor: ['rgba(54,162,235,1)'],
          borderWidth: 1
        }]
      },
      options: {  //Opciones del grafico
        maintainAspectRatio: false,
        responsive: true,
        scales: { 
          y: { beginAtZero: true }  //Empieza en 0
        }
      }
    });


  }



}
