import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-main-profile',
  templateUrl: './main-profile.component.html',
})
export class MainProfileComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
