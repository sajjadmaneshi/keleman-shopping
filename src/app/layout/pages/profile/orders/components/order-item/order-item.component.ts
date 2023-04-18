import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
