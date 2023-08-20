import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatestWith } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplicationStateService {
  get isTablet(): boolean {
    return this._isTablet;
  }
  get isPhone(): boolean {
    return this._isPhone;
  }
  private _isPhone!: boolean;
  private _isTablet!: boolean;
  private _isWeb!: boolean;

  constructor(private _responsive: BreakpointObserver) {}

  public init() {
    this._detectChange();
  }

  public _detectChange() {
    const PHONE = this._responsive.observe([Breakpoints.Handset]);
    const TABLET = this._responsive.observe([Breakpoints.TabletPortrait]);
    const WEB = this._responsive.observe([Breakpoints.Web]);

    PHONE.pipe(combineLatestWith(TABLET))
      .pipe(combineLatestWith(WEB))
      .subscribe((x) => {
        this._isPhone = x[0][0].matches;
        this._isTablet = x[0][1].matches;
        this._isWeb = x[1].matches;
      });
  }
}
