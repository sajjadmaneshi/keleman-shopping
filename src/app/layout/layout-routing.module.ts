import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../routing';
import { LayoutComponent } from './layout.component';
import { authGuard } from '../shared/guards/auth.guard';
import { CanonicalResolver } from '../../common/resolvers/canonical.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: Routing.checkout,
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },

      {
        path: Routing.blogs,
        loadChildren: () =>
          import('./pages/magazine/magazine.module').then(
            (m) => m.MagazineModule
          ),
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: Routing.product,
        loadChildren: () =>
          import('./pages/products/product.module').then(
            (m) => m.ProductModule
          ),
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: Routing.productCategory,
        loadChildren: () =>
          import('./pages/product-category/product-category.module').then(
            (m) => m.ProductCategoryModule
          ),
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: Routing.profile,
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [authGuard],
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
export class LayoutRoutingModule {}
