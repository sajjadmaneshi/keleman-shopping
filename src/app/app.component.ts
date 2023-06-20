import { Component } from '@angular/core';
import { ApplicationStateService } from './shared/services/application-state.service';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ApplicationStateService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'بازرگانی آسانسور کلمان';

  constructor(
    private _applicationState: ApplicationStateService,
    private _title: Title,
    private _jwtHelper: JwtHelperService
  ) {
    _title.setTitle(this.title);
    this._applicationState.init();
  }
}
