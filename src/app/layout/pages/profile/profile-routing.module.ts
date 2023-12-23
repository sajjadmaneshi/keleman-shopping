import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { Routing } from '../../../routing';
import { WalletComponent } from './wallet/wallet.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReturnedRequestComponent } from './returned-request/returned-request.component';
import { AddressesComponent } from './address/addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MyBoxesComponent } from './my-boxes/my-boxes.component';
import { CreditsComponent } from './credits/credits.component';
import { CommentQuestionComponent } from './comment-question/comment-question.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: MainProfileComponent },
      {
        path: `${Routing.wallet}`,
        component: WalletComponent,
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
      { path: Routing.comments, component: CommentQuestionComponent },
      { path: Routing.myBox, component: MyBoxesComponent },
      { path: Routing.credits, component: CreditsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
