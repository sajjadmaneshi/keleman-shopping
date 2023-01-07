import { Component } from '@angular/core';

@Component({
  selector: 'keleman-returned-request',
  templateUrl: './returned-request.component.html',
  styleUrls: ['./returned-request.component.scss'],
})
export class ReturnedRequestComponent {
  columns = [
    '#',
    'شماره مرجوعی',
    'شماره سفارش',
    'تاریخ و ساعت',
    'وضعیت',
    'عمیات',
  ];
  rows = [
    {
      id: 1,
      returnedNum: 123456,
      orderNum: 123456,
      dateAndTime: `<span class="d-flex justify-content-around">
<span>22:30</span>
<span>1401/05/02</span>
</span>`,
      status: '----',
      action: '----',
    },
  ];
}
