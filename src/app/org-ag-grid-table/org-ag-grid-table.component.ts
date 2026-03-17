import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-org-ag-grid-table',
  standalone: true,
  imports: [AgGridAngular, AgCharts],
  templateUrl: './org-ag-grid-table.component.html',
  styleUrl: './org-ag-grid-table.component.scss',
})
export class OrgAgGridTableComponent {
  public chartOptions: AgChartOptions;

  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];

  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    };
  }
}
