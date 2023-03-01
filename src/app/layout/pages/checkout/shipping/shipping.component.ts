import { Component } from '@angular/core';

@Component({
  selector: 'keleman-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {
  selectedAddress = {
    lat: 29.56,
    lng: 57.6,
    address:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است ',
    selected: false,
    name: 'خانه',
  };
}