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
      { path: 'detail/:url', component: ProductDetailsComponent },
      {
        path: ':catUrl1/:catUrl2/:catUrl3',
        component: ProductListComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: ':catUrl1/:catUrl2',
        component: ProductListComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: ':catUrl1',
        component: ProductListComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: '',
        component: ProductListComponent,
        data: {
          shouldDetach: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
