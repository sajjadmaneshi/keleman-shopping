import { Component, Input } from '@angular/core';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-returned-request-history',
  templateUrl: './returned-request-history.component.html',
  styleUrls: ['./returned-request-history.component.scss'],
})
export class ReturnedRequestHistoryComponent {
  @Input() status: ReturnedStatus = 0;

  statusEnum = ReturnedStatus;

  requests = [
    {
      returnedNum: 123456,
      orderNum: 123456,
      date: '2022-01-01T13:34:45',
      status: ReturnedStatus.approved,
    },
    {
      returnedNum: 123456,
      orderNum: 123456,
      date: '2022-01-01T13:34:45',
      status: ReturnedStatus.rejected,
    },
    {
      returnedNum: 123456,
      orderNum: 123456,
      date: '2022-01-01T13:34:45',
      status: ReturnedStatus.inProgress,
    },
    {
      returnedNum: 123456,
      orderNum: 123456,
      date: '2022-01-01T13:34:45',
      status: ReturnedStatus.approved,
    },
    {
      returnedNum: 123456,
      orderNum: 123456,
      date: '2022-01-01T13:34:45',
      status: ReturnedStatus.approved,
    },
  ];

  constructor(public persianDateTimeService: PersianDateTimeService) {}
}
export enum ReturnedStatus {
  inProgress,
  approved,
  rejected,
}
