import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDate,
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { PersianDatePickerService } from '../../services/persian-date-picker.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'keleman-date-picker',
  standalone: true,
  imports: [CommonModule, NgbInputDatepicker],
  templateUrl: './keleman-date-picker.component.html',
  styleUrls: ['./keleman-date-picker.component.scss'],
  providers: [
    {
      provide: NgbCalendar,
      useClass: NgbCalendarPersian,
    },
    { provide: NgbDatepickerI18n, useClass: PersianDatePickerService },
  ],
})
export class KelemanDatePickerComponent {
  @Output('onDatePickerClick') change = new EventEmitter<string>();

  date!: { year: number; month: number };

  toDateString(date: NgbDateStruct): string {
    return `${date.year}/${date.month}/${date.day}`;
  }

  toGregorianUTC(persianDateTime: NgbDateStruct, format?: string): string {
    const stringifyDate = this.toDateString(persianDateTime);
    return moment
      .from(stringifyDate, 'fa', format)
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }
  onDateSelect($event: NgbDate) {
    this.change.emit(this.toGregorianUTC($event));
  }
}
