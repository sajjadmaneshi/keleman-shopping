import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ValueChangerComponent } from '../shared/components/value-changer/value-changer.component';
import { SwiperComponent } from '../shared/components/swiper/swiper.component';
import { ImageResponsiveDirective } from '../shared/directives/image-responsive.directive';

import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../shared/directives/swiper-template.directive';
import { PriceComponent } from '../shared/components/price/price.component';
import { SwiperItemComponent } from '../shared/components/swiper/swiper-item/swiper-item.component';
import { InputGroupComponent } from '../shared/components/input-group/input-group.component';
import { HeaderComponent } from './_partials/header/header.component';
import { HeaderMenuComponent } from './_partials/header/header-menu/header-menu.component';
import {
  NgbAccordionModule,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPopover,
} from '@ng-bootstrap/ng-bootstrap';
import { MegaMenuComponent } from './_partials/header/header-menu/mega-menu/mega-menu.component';
import { TopMenuComponent } from './_partials/header/header-menu/top-menu/top-menu.component';
import { OffCanvasMenuComponent } from './_partials/header/header-menu/top-menu/off-canvas-menu/off-canvas-menu.component';
import { UserDropdownMenuComponent } from './_partials/header/header-menu/top-menu/user-dropdown-menu/user-dropdown-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '../shared/components/auto-complete/auto-complete.component';
import { MatComponentsModule } from '../mat-components.module';
import { FooterComponent } from './_partials/footer/footer.component';
import { SearchBarComponent } from './_partials/header/header-menu/top-menu/search-bar/search-bar.component';
import { SearchResultMenuComponent } from './_partials/header/header-menu/top-menu/search-bar/search-result-menu/search-result-menu.component';
import { SwiperModule } from 'swiper/angular';
import { HeaderMobileComponent } from './_partials/header/header-mobile/header-mobile.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadingDirective } from '../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../shared/directives/empty-image.directive';
import { TextWithIconComponent } from '../shared/components/text-with-icon/text-with-icon.component';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faGoogle,
  faSquareInstagram,
  faSquareTwitter,
  faSquareWhatsapp,
  faWhatsapp,
  faSquareYoutube,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { MatListModule } from '@angular/material/list';
import { ProductCategoryItemsComponent } from '../shared/components/product-category/product-category-items.component';
import { ProductCategoryItemComponent } from '../shared/components/product-category/product-category-item/product-category-item.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HeaderMenuComponent,
    MegaMenuComponent,
    TopMenuComponent,
    OffCanvasMenuComponent,
    UserDropdownMenuComponent,
    FooterComponent,
    SearchBarComponent,
    SearchResultMenuComponent,
    HeaderMobileComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ValueChangerComponent,
    NgOptimizedImage,
    SwiperComponent,
    ImageResponsiveDirective,
    SwiperContentDirective,
    SwiperTemplateDirective,
    PriceComponent,
    SwiperItemComponent,
    InputGroupComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
    ReactiveFormsModule,
    AutoCompleteComponent,
    MatComponentsModule,
    SwiperModule,
    NgxSkeletonLoaderModule,
    LazyLoadingDirective,
    EmptyImageDirective,
    TextWithIconComponent,
    NgbAccordionModule,
    ProductCategoryItemsComponent,
    FontAwesomeModule,
    NgbPopover,
    MatListModule,
    ProductCategoryItemComponent,
    MatBadgeModule,
  ],
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSquareInstagram,
      faSquareYoutube,
      faSquareTwitter,
      faTelegram,
      faGoogle,
      faWhatsapp,
      faSquareWhatsapp
    );
  }
}
