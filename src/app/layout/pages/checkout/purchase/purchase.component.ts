import { Component, Input } from '@angular/core';

import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
