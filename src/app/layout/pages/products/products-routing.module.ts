import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: ':catUrl1', component: ProductListComponent },
      { path: ':catUrl1/:catUrl2', component: ProductListComponent },
      { path: ':catUrl1/:catUrl2/:catUrl3', component: ProductListComponent },
      { path: ':name', component: ProductDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
