import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { EmptyContentComponent } from '../empty-content/empty-content.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadingDirective } from '../../../../shared/directives/lazy-loading.directive';
import { MatMenuModule } from '@angular/material/menu';
import { ReturnRequestDialogComponent } from './components/order-item/return-request-dialog/return-request-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { EmptyImageDirective } from '../../../../shared/directives/empty-image.directive';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { OrdersComponent } from './orders.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    ReturnRequestDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    EmptyContentComponent,
    RouterModule.forChild(routes),
    MatIconModule,
    LazyLoadingDirective,
    MatMenuModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatChipsModule,
    MatListModule,
    EmptyImageDirective,
    PaginationComponent,
    MatButtonToggleModule,
  ],
})
export class OrdersModule {}
