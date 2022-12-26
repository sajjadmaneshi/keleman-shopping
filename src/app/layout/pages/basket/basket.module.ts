import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketItemComponent} from "./components/basket-item/basket-item.component";
import {PurchaseComponent} from "./components/purchase/purchase.component";
import {BasketComponent} from "./basket.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {ValueChangerComponent} from "./components/basket-item/widgets/value-changer/value-changer.component";
import {RouterModule, Routes} from "@angular/router";


export const routes:Routes=[
  {path:'',component:BasketComponent}
]

@NgModule({
  declarations: [
    BasketItemComponent,
    PurchaseComponent,
    BasketComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    ValueChangerComponent,
    RouterModule.forChild(routes)
  ],

})
export class BasketModule { }
