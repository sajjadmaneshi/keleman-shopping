import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public toStringDay(dateTime: string): StringDayResult {
    try {
      if (!dateTime) {
        return StringDayResult.none;
      }

      const nowDt = new Date();
      const dt = new Date(dateTime);

      if (this._equleDates(nowDt, dt) && this._equleTimes(nowDt, dt)) {
        return StringDayResult.now;
      }

      if (this._equleDates(nowDt, dt)) {
        return StringDayResult.today;
      }

      nowDt.setDate(nowDt.getDate() - 1);
      if (this._equleDates(nowDt, dt)) {
        return StringDayResult.yesterday;
      }

      return StringDayResult.date;
    } catch (error) {
      return StringDayResult.none;
    }
  }

  private _equleDates(nowDateTime: Date, dateTime: Date): boolean {
    return (
      dateTime.getFullYear() === nowDateTime.getFullYear() &&
      dateTime.getMonth() === nowDateTime.getMonth() &&
      dateTime.getDay() === nowDateTime.getDay()
    );
  }

  private _equleTimes(nowDateTime: Date, dateTime: Date): boolean {
    return (
      dateTime.getHours() === nowDateTime.getHours() &&
      dateTime.getMinutes() === nowDateTime.getMinutes()
    );
  }
}
enum StringDayResult {
  none = 0,
  now = 1,
  today = 2,
  yesterday = 3,
  date = 4,
}
