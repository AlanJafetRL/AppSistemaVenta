import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { Chart, ChartItem, registerables } from 'chart.js'
import { DashBoardService } from '../../../../Services/dash-board.service';
Chart.register(...registerables);

import { isPlatformBrowser } from '@angular/common';  
//Para que solo se ejecute cuando este en el navegador y no el el servidor

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

  constructor(
    private _dashboardServicio: DashBoardService,
    @Inject(PLATFORM_ID) private platformId:object  //Detecta si esta en navegador o servidor
  ) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._dashboardServicio.resumen().subscribe({
        next: (data) => {
          if (data.status) {
            this.totalIngresos = data.value.totalIngresos;
            this.totalVentas = data.value.totalVentas;
            this.totalProductos = data.value.totalProductos;

            const arrayData: any[] = data.value.ventasUltimaSemana;

            const labelTemp = arrayData.map((value) => value.fecha);
            const dataTemp = arrayData.map((value) => value.total);

            this.mostrarGrafico(labelTemp, dataTemp);
          }
        },
        error: (e) => { }
      });
    }
  }

  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]) {

    const ctx: ChartItem = document.getElementById('chartBarras') as ChartItem;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: '# de Ventas',
          data: dataGrafico,
          backgroundColor: ['rgba(54,162,235,0.2)'],
          borderColor: ['rgba(54,162,235,1)'],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });


  }



}
