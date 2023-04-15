import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EmptyContentComponent } from '../empty-content/empty-content.component';
import { CurrentOrdersComponent } from './components/current-orders/current-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';
import { ReturnedOrdersComponent } from './components/returned-orders/returned-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadingDirective } from '../../../../shared/directives/lazy-loading.directive';

export const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  declarations: [
    OrdersComponent,
    CurrentOrdersComponent,
    DeliveredOrdersComponent,
    ReturnedOrdersComponent,
    OrderItemComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    EmptyContentComponent,
    RouterModule.forChild(routes),
    MatIconModule,
    LazyLoadingDirective,
  ],
})
export class OrdersModule {}
