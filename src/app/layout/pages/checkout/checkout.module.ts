import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from './basket/basket-item/basket-item.component';
import { CheckoutComponent } from './checkout.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { KelemanValueChangerComponent } from '../../../shared/components/keleman-value-changer/keleman-value-changer.component';
import { RouterModule, Routes } from '@angular/router';
import { KelemanPriceComponent } from '../../../shared/components/keleman-price/keleman-price.component';
import { PurchaseComponent } from '../../views/shared/purchase/purchase.component';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutStepperComponent } from './checkout-stepper/checkout-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BasketComponent } from './basket/basket.component';
import { Routing } from '../../../routing';
import { ShippingComponent } from './shipping/shipping.component';
import { AddressItemComponent } from '../profile/address/address-item/address-item.component';
import { ShippingTimeComponent } from './shipping/shipping-time/shipping-time.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckoutService } from './services/checkout.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: Routing.basket, pathMatch: 'full' },
      { path: Routing.basket, component: BasketComponent },
      { path: Routing.shipping, component: ShippingComponent },
      { path: Routing.payment, component: PaymentComponent },
    ],
  },
];

@NgModule({
  declarations: [
    BasketItemComponent,
    CheckoutComponent,
    CheckoutStepperComponent,
    BasketComponent,
    ShippingComponent,
    ShippingTimeComponent,
    PaymentComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    KelemanValueChangerComponent,
    RouterModule.forChild(routes),
    KelemanPriceComponent,
    PurchaseComponent,
    MatIconModule,
    MatStepperModule,
    AddressItemComponent,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
  ],
  providers: [CheckoutService],
})
export class CheckoutModule {}
