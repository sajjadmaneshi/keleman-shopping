import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserSimpleInfoViewModel } from '../../../../../../shared/models/view-models/user-simple-info.view-model';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'keleman-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownMenuComponent {
  @Input() userInfo!: UserSimpleInfoViewModel;
  constructor(public authService: AuthService) {}
}
