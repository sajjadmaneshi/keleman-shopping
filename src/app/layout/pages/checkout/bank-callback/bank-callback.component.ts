import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'keleman-bank-callback',
  standalone: true,
  imports: [MatIconModule, RouterLink, NgClass],
  templateUrl: './bank-callback.component.html',
  styleUrl: './bank-callback.component.scss',
})
export class BankCallbackComponent {
  paymentResult!: PaymentResult;

  constructor(private _activatedRoute: ActivatedRoute) {
    this._getParamsFromRoute();
  }

  private _getParamsFromRoute() {
    this._activatedRoute.queryParams.subscribe((result) => {
      this.paymentResult = new PaymentResult(
        +result['orderId'],
        +result['status'],
        +result['trackingCode']
      );
    });
  }
}
export class PaymentResult {
  constructor(
    public orderId: number,
    public status: number,
    public trackingCode: number
  ) {}
}
