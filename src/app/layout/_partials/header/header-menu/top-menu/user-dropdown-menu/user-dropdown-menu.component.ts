import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { ProfileViewModel } from '../../../../../pages/profile/data/view-models/profile.view-model';
import { UserCreditViewModel } from '../../../../../pages/profile/data/view-models/user-credit.view-model';

@Component({
  selector: 'keleman-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styles: [
    `
      .dropdown-item.active,
      .dropdown-item:active {
        background-color: transparent !important;
        color: black !important;
      }
    `,
  ],
})
export class UserDropdownMenuComponent {
  @Input() userInfo!: ProfileViewModel;
  @Input() userCredit = new UserCreditViewModel();
  constructor(public authService: AuthService) {}
}
