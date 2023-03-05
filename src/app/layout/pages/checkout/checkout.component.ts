import { Component } from '@angular/core';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(public checkoutService: CheckoutService) {}
}
