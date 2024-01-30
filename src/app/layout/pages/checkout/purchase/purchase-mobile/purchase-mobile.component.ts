import { Component } from '@angular/core';

import { PurchaseWebComponent } from '../purchase-web/purchase-web.component';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
})
export class PurchaseMobileComponent extends PurchaseWebComponent {
  submitPay() {
    this._basketService.readyForPay.next(true);
  }
}
