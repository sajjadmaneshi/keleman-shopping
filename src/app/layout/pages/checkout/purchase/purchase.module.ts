import { NgModule } from '@angular/core';
import { PurchaseWebComponent } from './purchase-web/purchase-web.component';
import { PurchaseMobileComponent } from './purchase-mobile/purchase-mobile.component';
import { AsyncPipe, CommonModule, DecimalPipe, NgIf } from '@angular/common';
import { UntilFreeShippingComponent } from './components/until-free-shipping/until-free-shipping.component';
import { PurchaseComponent } from './purchase.component';
import { PriceComponent } from '../../../../shared/components/price/price.component';
import { MainPurchaseComponent } from './components/main-purchase/main-purchase.component';
import { LoadingProgressDirective } from '../../../../shared/directives/loading-progress.directive';

@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseWebComponent,
    PurchaseMobileComponent,
    UntilFreeShippingComponent,
    MainPurchaseComponent,
  ],
  imports: [
    CommonModule,
    AsyncPipe,
    NgIf,
    DecimalPipe,
    PriceComponent,
    LoadingProgressDirective,
  ],
  exports: [PurchaseComponent],
})
export class PurchaseModule {}
