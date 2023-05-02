import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { Routing } from '../../../routing';
import { WalletComponent } from './wallet/wallet.component';
import { IncreaseWalletComponent } from './wallet/components/increase-wallet/increase-wallet.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReturnedRequestComponent } from './returned-request/returned-request.component';
import { AddressesComponent } from './address/addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UserCommentsComponent } from './comments/user-comments.component';
import { MyBoxesComponent } from './my-boxes/my-boxes.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: MainProfileComponent },
      {
        path: `${Routing.wallet}`,
        component: WalletComponent,
        children: [
          {
            path: '',
            redirectTo: 'increase',
            pathMatch: 'full',
          },
          {
            path: 'increase',
            component: IncreaseWalletComponent,
          },
        ],
      },
      {
        path: Routing.orders,
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      { path: Routing.favorites, component: FavoritesComponent },
      { path: Routing.returnedRequests, component: ReturnedRequestComponent },
      { path: Routing.address, component: AddressesComponent },
      { path: Routing.personalInfo, component: PersonalInfoComponent },
      { path: Routing.comments, component: UserCommentsComponent },
      { path: Routing.myBox, component: MyBoxesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
