import { inject, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CanonicalResolver } from '../../../../common/resolvers/canonical.resolver';
import { Routing } from '../../../routing';
import { ProductsComponent } from './products.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,

    children: [
      {
        path: '',
        redirectTo: Routing.category,
        pathMatch: 'full',
      },
      {
        path: `${Routing.category}/:catUrl1/:catUrl2/:catUrl3`,
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: `${Routing.category}/:catUrl1/:catUrl2`,
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: `${Routing.category}/:catUrl1`,
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: Routing.category,
        component: ProductListComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },

      {
        path: ':url',
        component: ProductDetailsComponent,
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
