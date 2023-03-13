import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainProfileComponent } from './main-profile/main-profile.component';

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
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { EmptyContentComponent } from './empty-content/empty-content.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReturnedRequestComponent } from './returned-request/returned-request.component';
import { AddressesComponent } from './address/addresses.component';
import { KelemanMapComponent } from '../../../shared/components/keleman-map/keleman-map.component';
import { AddAddressDialogComponent } from './address/add-address-dialog/add-address-dialog.component';
import { KelemanAutocompleteComponent } from '../../../shared/components/keleman-autocomplete/keleman-autocomplete.component';
import { MatComponentsModule } from '../../../mat-components.module';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MatSelectModule } from '@angular/material/select';
import { CommentsComponent } from './comments/comments.component';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FavoriteCategoriesItemComponent } from './favorites/components/favorite-categories/favorite-categories-item/favorite-categories-item.component';
import { FavoriteCategoriesComponent } from './favorites/components/favorite-categories/favorite-categories.component';
import { AddressItemComponent } from './address/address-item/address-item.component';
import { WalletTransactionHistoryComponent } from './wallet/components/increase-wallet/wallet-transaction-history/wallet-transaction-history.component';
import { KelemanPriceComponent } from '../../../shared/components/keleman-price/keleman-price.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SideBarComponent,
    MainProfileComponent,

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
    PersonalInfoComponent,
    CommentsComponent,
    CommentItemComponent,
    FavoriteCategoriesItemComponent,
    FavoriteCategoriesComponent,
    WalletTransactionHistoryComponent,
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
    PaginatorComponent,
    MatSelectModule,
    NgbTooltip,
    MatCheckboxModule,
    AddressItemComponent,
    KelemanPriceComponent,
  ],
})
export class ProfileModule {}
