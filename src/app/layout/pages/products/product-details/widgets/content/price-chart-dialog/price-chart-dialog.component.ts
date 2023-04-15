import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'price-chart-dialog',
  templateUrl: './price-chart-dialog.component.html',
  styleUrls: ['./price-chart-dialog.component.scss'],
})
export class PriceChartDialogComponent {
  @Input() items!: any[];
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      height: 300,
      style: {
        fontFamily: 'IRANYekanXFaNum',
      },
    },
    title: {
      text: undefined,
    },
    yAxis: {
      title: {
        text: 'مبلغ',
      },
      labels: {
        style: {
          fontFamily: 'IranYekan',
        },
      },
    },
    legend: {
      align: 'right',
      rtl: true,
      layout: 'vertical',
      verticalAlign: 'middle',
      labelFormat: 'قیمت',
    },

    series: [
      {
        type: 'line',
        data: [
          100000000, 200000000, 200000000, 200000000, 300000000, 250000000,
        ],
      },
    ],
    accessibility: { enabled: false },
  };
  constructor(private _dialogRef: MatDialogRef<PriceChartDialogComponent>) {}

  close() {
    this._dialogRef.close();
  }
}
