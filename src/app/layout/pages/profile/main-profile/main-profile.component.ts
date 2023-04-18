import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
})
export class MainProfileComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
