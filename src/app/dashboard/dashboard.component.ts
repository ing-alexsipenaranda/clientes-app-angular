import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  facturas: any[] = [];  // Aquí almacenarás las facturas (datos ficticios)

  constructor() {}

  ngOnInit(): void {
    this.cargarFacturas();  // Llamar al método para cargar las facturas
    this.createChart();
  }

  // Método para cargar todas las facturas (simulando datos estáticos)
  cargarFacturas(): void {
    // Simulamos la carga de facturas con datos estáticos
    this.facturas = [
      { id: 1, descripcion: 'Factura A', monto: 200 },
      { id: 2, descripcion: 'Factura B', monto: 350 },
      { id: 3, descripcion: 'Factura C', monto: 120 },
      { id: 4, descripcion: 'Factura D', monto: 450 },
      { id: 5, descripcion: 'Factura E', monto: 300 },
    ];
    console.log(this.facturas);  // Ver las facturas en la consola
    this.createChart();  // Crear el gráfico con los datos de facturas
  }

  // Crear gráfico con los datos de las facturas
  createChart(): void {
    const labels = this.facturas.map(factura => factura.descripcion);  // Usamos 'descripcion' como etiquetas
    const data = this.facturas.map(factura => factura.monto);  // Usamos 'monto' como los valores a mostrar

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,  // Etiquetas de las facturas
        datasets: [
          {
            label: '# Monto Facturado',
            data: data,  // Monto de cada factura
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Generar el PDF con el gráfico
  generatePDF(): void {
    const doc = new jsPDF();
    doc.text('Gráfico de Facturas', 10, 10);
    const chartImage = this.chart.toBase64Image();  // Obtener la imagen del gráfico
    doc.addImage(chartImage, 'PNG', 10, 20, 180, 100);  // Agregar la imagen al PDF
    doc.save('facturas-chart.pdf');  // Guardar el PDF con el gráfico
  }

  // Generar el archivo Excel con los datos de las facturas
  generateExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Factura ID', 'Descripción', 'Monto'],
      ...this.facturas.map(factura => [factura.id, factura.descripcion, factura.monto])  // Añadir datos de facturas
    ]);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Facturas');
    XLSX.writeFile(wb, 'facturas-data.xlsx');  // Guardar el archivo Excel
  }
}