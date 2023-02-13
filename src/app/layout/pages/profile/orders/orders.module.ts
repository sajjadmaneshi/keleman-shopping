import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatTabsModule } from '@angular/material/tabs';
import { KelemanTableComponent } from '../../../../shared/components/keleman-table/keleman-table.component';
import { EmptyContentComponent } from '../empty-content/empty-content.component';
import { CurrentOrdersComponent } from './components/current-orders/current-orders.component';
import { DeliveredOrdersComponent } from './components/delivered-orders/delivered-orders.component';
import { ReturnedOrdersComponent } from './components/returned-orders/returned-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';

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
    KelemanTableComponent,
    EmptyContentComponent,
    RouterModule.forChild(routes),
    MatIconModule,
    PaginatorComponent,
  ],
})
export class OrdersModule {}
