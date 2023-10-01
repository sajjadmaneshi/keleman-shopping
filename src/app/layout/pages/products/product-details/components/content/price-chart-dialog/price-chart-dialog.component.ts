import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { ProductRepository } from '../../../../data/repositories/product.repository';
import { Subject } from 'rxjs';
import { ProductPriceChartViewModel } from '../../../../data/models/view-models/product-price-chart.view-model';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';
@Component({
  selector: 'price-chart-dialog',
  templateUrl: './price-chart-dialog.component.html',
})
export class PriceChartDialogComponent {
  dateTimes: string[] = [];
  prices: number[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  destory$ = new Subject<void>();
  constructor(
    private _dialogRef: MatDialogRef<PriceChartDialogComponent>,
    private _persianDateTimeService: PersianDateTimeService,
    @Inject(MAT_DIALOG_DATA)
    public data: { productTitle: string; price: ProductPriceChartViewModel[] }
  ) {
    this.loadData();
  }

  loadData() {
    this.dateTimes = this.data.price.map((entry) =>
      this._persianDateTimeService.fromGregorianString(
        entry.dateTime,
        'YYYY/jMM/DD'
      )
    );
    this.prices = this.data.price.map((entry) => entry.price);
    this.setupChart();
  }

  setupChart() {
    let tooltipPointFormat =
      '<tr><td style="padding-left: 5px; direction: rtl;">تومان</td><td class="p-0"><b>{point.y:,.0f}</b></td><td style="padding: 0; font-size: 10px; direction: rtl; ">{series.name}<span>&nbsp</span>:<span>&nbsp</span></td><td style="padding-right: 5px; font-size: 12px; direction: rtl; color: { series.color }; "><span class="fa fa-circle" style="color: {series.color};"></span></td></tr>';
    this.Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ',',
      },
    });

    this.chartOptions = {
      credits: {
        enabled: false,
      },
      chart: {
        style: {
          fontFamily: 'IRANYekanXFaNum',
        },
      },
      title: {
        text: 'نمودار قیمت (تومان)',
      },
      xAxis: {
        categories: this.dateTimes,
      },
      yAxis: {
        title: {
          text: '',
        },

        labels: {
          rotation: -45,
          useHTML: true,
          formatter: function () {
            const value = Number(this.value);
            if (value === 0) return `${value}`;
            const unit = value > 1000 && value < 1000000 ? 'K' : 'M';
            const convertedValue =
              value > 1000 && value < 1000000 ? value / 1000 : value / 1000000;
            return `
    <span class="d-flex">
      <span class="px-1">${convertedValue}</span>${unit}
    </span>`;
          },
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat:
          '<div style="direction: rtl;font-size: 12px;text-align:right" id=""> تاریخ : {point.key} </div><table>',
        pointFormat: tooltipPointFormat,
        footerFormat: '</table>',
        valueDecimals: 0,
      },

      series: [
        {
          type: 'line',
          name: 'قیمت',
          data: this.prices,
        },
      ],
      accessibility: { enabled: false },
    };
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

  close() {
    this._dialogRef.close();
  }
}
