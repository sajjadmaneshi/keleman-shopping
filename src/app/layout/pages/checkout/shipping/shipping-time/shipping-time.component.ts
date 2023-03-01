import { Component } from '@angular/core';

@Component({
  selector: 'keleman-shipping-time',
  templateUrl: './shipping-time.component.html',
  styleUrls: ['./shipping-time.component.scss'],
})
export class ShippingTimeComponent {
  shippingTimes = [
    {
      id: 1,
      day: 'شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: false,
    },
    {
      id: 2,
      day: '1شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: false,
    },
    {
      id: 3,
      day: '2شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: true,
    },
    {
      id: 4,
      day: '3شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: true,
    },
    {
      id: 5,
      day: '4شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: true,
    },
    {
      id: 6,
      day: '5شنبه',
      date: '2022/01/02',
      time: '9-12',
      enabled: true,
    },
    {
      id: 7,
      day: 'جمعه',
      date: '2022/01/02',
      time: '9-12',
      enabled: true,
    },
  ];
}
