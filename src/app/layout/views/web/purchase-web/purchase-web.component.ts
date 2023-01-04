import { Component } from '@angular/core';
import { KelemanPriceComponent } from '../../../../shared/components/keleman-price/keleman-price.component';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
  styleUrls: ['./purchase-web.component.scss'],
  standalone: true,
  imports: [KelemanPriceComponent],
})
export class PurchaseWebComponent {}