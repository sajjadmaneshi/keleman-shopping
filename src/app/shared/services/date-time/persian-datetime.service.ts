import { Injectable } from '@angular/core';

import { DateTimeResult } from '../../models/date-time-result.model';

import * as moment from 'jalali-moment';

@Injectable({
  providedIn: 'root',
})
export class PersianDateTimeService {
  toGregorian(persianDateTime: string, format?: string): Date {
    return moment.from(persianDateTime, 'fa', format).toDate();
  }

  toGregorianUTC(persianDateTime: string, format?: string): string {
    return moment
      .from(persianDateTime, 'fa', format)
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  fromGregorian(dateTime: string): DateTimeResult {
    const persianDateTime = moment(dateTime)
      .locale('fa')
      .format('YYYY/MM/DD#HH:mm:ss');

    const dt = persianDateTime.split('#');
    const result: DateTimeResult = { year: '', month: '', day: '' };

    if (dt.length > 0) {
      const dates = dt[0].split('/');
      const times = dt[1].split(':');

      result.year = dates[0];
      result.month = dates[1];
      result.day = dates[2];

      if (times.length > 0) {
        result.hours = times[0];
        result.minutes = times[1];
        result.seconds = times[2];
      }
    }

    return result;
  }

  fromGregorianString(dateTime: string, format?: string): string {
    return moment(dateTime).locale('fa').format(format);
  }
}
