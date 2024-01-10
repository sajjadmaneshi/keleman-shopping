import {
  Component,
  EventEmitter,
  Output,
  inject,
  Input,
  OnInit,
} from '@angular/core';
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
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NgbCalendar,
      useClass: NgbCalendarPersian,
    },
    { provide: NgbDatepickerI18n, useClass: PersianDatePickerService },
  ],
})
export class DatePickerComponent implements OnInit {
  @Input('range') range: boolean = false;
  @Input('minDate') minDate!: NgbDateStruct;

  @Output('onDatePickerClick') change = new EventEmitter<string>();

  calendar = inject(NgbCalendar);
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);

  ngOnInit(): void {
    this.minDate = this.minDate || this.calendar.getToday();
  }
  toDateString(date: NgbDateStruct): string {
    return `${date.year}/${date.month}/${date.day}`;
  }

  toGregorianUTC(persianDateTime: NgbDateStruct): string {
    moment.locale('en');
    const stringifyDate = this.toDateString(persianDateTime);
    const convertedDate = moment
      .from(stringifyDate, 'fa', 'YYYY/MM/DD')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return convertedDate;
  }
  onDateSelect($event: NgbDate) {
    this.change.emit(this.toGregorianUTC($event));
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
