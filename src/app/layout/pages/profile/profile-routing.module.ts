import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { Routing } from '../../../routing';
import { WalletComponent } from './wallet/wallet.component';
import { IncreaseWalletComponent } from './wallet/components/increase-wallet/increase-wallet.component';
import { DecreaseWalletComponent } from './wallet/components/decrease-wallet/decrease-wallet.component';

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
          { path: 'decrease', component: DecreaseWalletComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
export type RouteData = {
  title?: string;
  permission?: string[];
};
