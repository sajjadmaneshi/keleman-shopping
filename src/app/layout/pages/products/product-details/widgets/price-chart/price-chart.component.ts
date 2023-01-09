import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss'],
})
export class PriceChartComponent {
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
}
