import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
