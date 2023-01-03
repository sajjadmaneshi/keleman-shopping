import { Component, ViewEncapsulation } from '@angular/core';
import { KelemanPriceComponent } from '../../../../shared/components/keleman-price/keleman-price.component';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [KelemanPriceComponent],
})
export class PurchaseMobileComponent {}
