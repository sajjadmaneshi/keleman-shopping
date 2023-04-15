import { Component, ViewEncapsulation } from '@angular/core';
import { PriceComponent } from '../../../../shared/components/price/price.component';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [PriceComponent],
})
export class PurchaseMobileComponent {}
