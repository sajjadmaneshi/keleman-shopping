import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { BasketComponent } from './basket.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { KelemanValueChangerComponent } from '../../../shared/components/keleman-value-changer/keleman-value-changer.component';
import { RouterModule, Routes } from '@angular/router';
import { KelemanPriceComponent } from '../../../shared/components/keleman-price/keleman-price.component';
import { PurchaseComponent } from '../../views/shared/purchase/purchase.component';

export const routes: Routes = [{ path: '', component: BasketComponent }];

@NgModule({
  declarations: [BasketItemComponent, BasketComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    KelemanValueChangerComponent,
    RouterModule.forChild(routes),
    KelemanPriceComponent,
    PurchaseComponent,
  ],
})
export class BasketModule {}
