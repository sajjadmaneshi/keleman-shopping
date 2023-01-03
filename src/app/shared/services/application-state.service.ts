import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest } from 'rxjs';
@Injectable()
export class ApplicationStateService {
  get isWeb(): boolean {
    return this._isWeb;
  }
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

    combineLatest(PHONE, TABLET, WEB).subscribe((data) => {
      console.log(data);
      this._isPhone = data[0].matches;
      this._isTablet = data[1].matches;
      this._isWeb = data[2].matches;
    });
  }
}
