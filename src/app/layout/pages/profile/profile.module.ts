import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './side-bar/user-info/user-info.component';
import { UserWalletComponent } from './side-bar/user-wallet/user-wallet.component';
import { SideBarMenuComponent } from './side-bar/side-bar-menu/side-bar-menu.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { PersonalInfoComponent } from './main-profile/widgets/personal-info/personal-info.component';
import { LatestFavoritesComponent } from './main-profile/widgets/latest-favorites/latest-favorites.component';
import { LatestOrdersComponent } from './main-profile/widgets/latest-orders/latest-orders.component';
import { KelemanSwiperComponent } from '../../../shared/components/keleman-swiper/keleman-swiper.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { SwiperItemComponent } from '../../views/shared/swiper-item/swiper-item.component';
import { FavoriteItemComponent } from './shared/favorite-item/favorite-item.component';
import { WalletComponent } from './wallet/wallet.component';
import { IncreaseWalletComponent } from './wallet/components/increase-wallet/increase-wallet.component';
import { DecreaseWalletComponent } from './wallet/components/decrease-wallet/decrease-wallet.component';
import { KelemanInputGroupComponent } from '../../../shared/components/keleman-input-group/keleman-input-group.component';
import { WalletAmountCardComponent } from './wallet/components/wallet-amount-card/wallet-amount-card.component';
import { KelemanTableComponent } from '../../../shared/components/keleman-table/keleman-table.component';
import { WithdrawRequestDialogComponent } from './wallet/components/decrease-wallet/withdraw-request-dialog/withdraw-request-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
} from '@ng-bootstrap/ng-bootstrap';
import { EmptyContentComponent } from './empty-content/empty-content.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReturnedRequestComponent } from './returned-request/returned-request.component';
import { AddressesComponent } from './address/addresses.component';
import { KelemanMapComponent } from '../../../shared/components/keleman-map/keleman-map.component';
import { AddAddressDialogComponent } from './address/add-address-dialog/add-address-dialog.component';
import { AddressItemComponent } from './address/address-item/address-item.component';
import { KelemanAutocompleteComponent } from '../../../shared/components/keleman-autocomplete/keleman-autocomplete.component';
import { MatComponentsModule } from '../../../mat-components.module';

@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    UserWalletComponent,
    SideBarMenuComponent,
    MainProfileComponent,
    PersonalInfoComponent,
    LatestFavoritesComponent,
    LatestOrdersComponent,
    FavoriteItemComponent,
    WalletComponent,
    IncreaseWalletComponent,
    DecreaseWalletComponent,
    WalletAmountCardComponent,
    WithdrawRequestDialogComponent,
    FavoritesComponent,
    ReturnedRequestComponent,
    AddressesComponent,
    AddAddressDialogComponent,
    AddressItemComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DecimalPipe,
    KelemanSwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
    SwiperItemComponent,
    KelemanInputGroupComponent,
    KelemanTableComponent,
    ReactiveFormsModule,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    EmptyContentComponent,
    KelemanMapComponent,
    KelemanAutocompleteComponent,
    MatComponentsModule,
  ],
})
export class ProfileModule {}
