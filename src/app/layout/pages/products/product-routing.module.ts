import { inject, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CanonicalResolver } from '../../../../common/resolvers/canonical.resolver';
import { Routing } from '../../../routing';
import { ProductComponent } from './product.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':url',
        component: ProductComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: '',
        redirectTo: `/${Routing.notFound}`,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
