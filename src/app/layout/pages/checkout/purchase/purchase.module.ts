import { NgModule } from '@angular/core';
import { PurchaseWebComponent } from './purchase-web/purchase-web.component';
import { PurchaseMobileComponent } from './purchase-mobile/purchase-mobile.component';
import { AsyncPipe, CommonModule, DecimalPipe, NgIf } from '@angular/common';
import { UntilFreeShippingComponent } from './components/until-free-shipping/until-free-shipping.component';
import { PurchaseComponent } from './purchase.component';
import { PriceComponent } from '../../../../shared/components/price/price.component';
import { MainPurchaseComponent } from './components/main-purchase/main-purchase.component';
import { BasketService } from './basket.service';
import { BasketRepository } from '../data/repositories/basket.repository';

@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseWebComponent,
    PurchaseMobileComponent,
    UntilFreeShippingComponent,
    MainPurchaseComponent,
  ],
  imports: [CommonModule, AsyncPipe, NgIf, DecimalPipe, PriceComponent],
  providers: [BasketRepository, BasketService],
  exports: [PurchaseComponent],
})
export class PurchaseModule {}
