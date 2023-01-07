import { Component } from '@angular/core';

@Component({
  selector: 'keleman-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.scss'],
})
export class CurrentOrdersComponent {
  columns = [
    '#',
    'مشاهده',
    'شماره سفارش',
    'تاریخ سفارش',
    'مبلغ سفارش',
    'روش پرداخت',
    'وضعیت',
    'مشاهده سبد خرید',
  ];
  rows = [
    {
      num: 1,
      view: `<span class="material-icons-outlined">visibility</span>`,
      orderNum: '123456',
      orderDate: '1401/5/24',
      price: `<span >2500000</span>`,
      paymentMethod: 'درگاه',
      status: '---',
      seeBasket: `<a class="btn btn-klm-primary rounded-pill">مشاهده سبد خرید</a>`,
    },
  ];
}
