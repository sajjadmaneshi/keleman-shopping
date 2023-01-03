import { Component } from '@angular/core';

import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent {
  constructor(public applicationStateService: ApplicationStateService) {}
}
