import { inject, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CanonicalResolver } from '../../../../common/resolvers/canonical.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,

    children: [
      {
        path: 'detail/:url',
        component: ProductDetailsComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: ':catUrl1/:catUrl2/:catUrl3',
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: ':catUrl1/:catUrl2',
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: ':catUrl1',
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: '',
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
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
