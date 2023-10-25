import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainProfileComponent } from './main-profile/main-profile.component';

import { LatestFavoritesComponent } from './main-profile/widgets/latest-favorites/latest-favorites.component';
import { LatestOrdersComponent } from './main-profile/widgets/latest-orders/latest-orders.component';
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { SwiperItemComponent } from '../../../shared/components/swiper/swiper-item/swiper-item.component';
import { FavoriteItemComponent } from './shared/favorite-item/favorite-item.component';
import { WalletComponent } from './wallet/wallet.component';
import { IncreaseWalletComponent } from './wallet/components/increase-wallet/increase-wallet.component';
import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';
import { WalletAmountCardComponent } from './wallet/components/wallet-amount-card/wallet-amount-card.component';
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
import { AutoCompleteComponent } from '../../../shared/components/auto-complete/auto-complete.component';
import { MatComponentsModule } from '../../../mat-components.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MatSelectModule } from '@angular/material/select';
import { UserCommentsComponent } from './comments/user-comments.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AddressItemComponent } from './address/address-item/address-item.component';
import { WalletTransactionHistoryComponent } from './wallet/components/increase-wallet/wallet-transaction-history/wallet-transaction-history.component';
import { PriceComponent } from '../../../shared/components/price/price.component';
import { ProfileMobileMenuComponent } from './profile-mobile-menu/profile-mobile-menu.component';
import { ProfileMenuComponent } from './shared/profile-menu/profile-menu.component';
import { ReturnedRequestHistoryComponent } from './returned-request/returned-request-history/returned-request-history.component';
import { MyBoxesComponent } from './my-boxes/my-boxes.component';
import { MyBoxItemComponent } from './my-boxes/my-box-item/my-box-item.component';
import { ModifyBoxFormComponent } from './my-boxes/modify-box-form/modify-box-form.component';
import { BoxProductItemComponent } from './my-boxes/modify-box-form/product-item/box-product-item.component';
import { SelectedProductBoxComponent } from './my-boxes/modify-box-form/selected-product-box/selected-product-box.component';
import { ValueChangerComponent } from '../../../shared/components/value-changer/value-changer.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { CommentsModule } from '../../../shared/components/comments/comments.module';

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
    WalletAmountCardComponent,
    FavoritesComponent,
    ReturnedRequestComponent,
    AddressesComponent,
    AddAddressDialogComponent,
    PersonalInfoComponent,
    UserCommentsComponent,
    WalletTransactionHistoryComponent,
    ProfileMobileMenuComponent,
    ProfileMenuComponent,
    ReturnedRequestHistoryComponent,
    MyBoxesComponent,
    MyBoxItemComponent,
    ModifyBoxFormComponent,
    BoxProductItemComponent,
    SelectedProductBoxComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DecimalPipe,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
    SwiperItemComponent,
    InputGroupComponent,
    ReactiveFormsModule,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    EmptyContentComponent,
    KelemanMapComponent,
    AutoCompleteComponent,
    MatComponentsModule,
    MatSelectModule,
    NgbTooltip,
    MatCheckboxModule,
    AddressItemComponent,
    PriceComponent,
    ValueChangerComponent,
    LazyLoadingDirective,
    CommentsModule,
  ],
})
export class ProfileModule {}
