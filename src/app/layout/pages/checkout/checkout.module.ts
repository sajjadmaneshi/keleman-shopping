import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BasketItemComponent } from './basket/basket-item/basket-item.component';
import { CheckoutComponent } from './checkout.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ValueChangerComponent } from '../../../shared/components/value-changer/value-changer.component';
import { RouterModule, Routes } from '@angular/router';
import { PriceComponent } from '../../../shared/components/price/price.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckoutService } from './services/checkout.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AttachReceiptDialogComponent } from './payment/attach-receipt-dilog/attach-receipt-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReceiptFormComponent } from './payment/attach-receipt-dilog/receipt-form/receipt-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NumberToPersianPipe } from '../../../shared/pipes/num2persian.pipe';
import { AttachChequeDialogComponent } from './payment/attach-cheque-dialog/attach-cheque-dialog.component';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneComponent } from '../../../shared/components/dropzone/dropzone.component';

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
    AttachReceiptDialogComponent,
    ReceiptFormComponent,
    AttachChequeDialogComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    ValueChangerComponent,
    RouterModule.forChild(routes),
    PriceComponent,
    PurchaseComponent,
    MatIconModule,
    MatStepperModule,
    AddressItemComponent,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NumberToPersianPipe,
    NgbInputDatepicker,
    DatePickerComponent,
    NgxDropzoneModule,
    DropzoneComponent,
  ],
  providers: [DecimalPipe, CheckoutService],
})
export class CheckoutModule {}
