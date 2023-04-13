import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../routing';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      {
        path: Routing.checkout,
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },

      {
        path: Routing.magazine,
        loadChildren: () =>
          import('./pages/magazine/magazine.module').then(
            (m) => m.MagazineModule
          ),
      },
      {
        path: Routing.products,
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: Routing.profile,
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class LayoutRoutingModule {}
