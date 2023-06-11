import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
