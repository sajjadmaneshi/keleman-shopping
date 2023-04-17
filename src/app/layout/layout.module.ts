import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ValueChangerComponent } from '../shared/components/value-changer/value-changer.component';
import { MainComponent } from './pages/main/main.component';
import { SwiperComponent } from '../shared/components/swiper/swiper.component';
import { AmazingOfferSwiperComponent } from './pages/main/components/background-swiper/amazing-offer-swiper/amazing-offer-swiper.component';
import { BackgroundSwiperItemComponent } from './pages/main/components/background-swiper/background-swiper-item/background-swiper-item.component';
import { KelemanProductCategoryComponent } from './pages/main/components/product-category/keleman-product-category.component';
import { ProductCategoryItemComponent } from './pages/main/components/product-category/product-category-item/product-category-item.component';
import { ImageResponsiveDirective } from '../shared/directives/image-responsive.directive';
import { TopSliderComponent } from './pages/main/components/top-slider/top-slider.component';
import { NgOtpInputModule } from 'ng-otp-input';

import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../shared/directives/swiper-template.directive';
import { PriceComponent } from '../shared/components/price/price.component';
import { ContentComponent } from './_partials/content/content.component';
import { SwiperItemComponent } from './views/shared/swiper-item/swiper-item.component';
import { InputGroupComponent } from '../shared/components/input-group/input-group.component';
import { HeaderComponent } from './_partials/header/header.component';
import { HeaderMenuComponent } from './_partials/header/header-menu/header-menu.component';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { MegaMenuComponent } from './_partials/header/header-menu/mega-menu/mega-menu.component';
import { TopMenuComponent } from './_partials/header/header-menu/top-menu/top-menu.component';
import { OffCanvasMenuComponent } from './_partials/header/header-menu/top-menu/off-canvas-menu/off-canvas-menu.component';
import { UserDropdownMenuComponent } from './_partials/header/header-menu/top-menu/user-dropdown-menu/user-dropdown-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '../shared/components/auto-complete/auto-complete.component';
import { MatComponentsModule } from '../mat-components.module';
import { MagazineComponent } from './pages/main/components/magazine/magazine.component';
import { PackageSwiperComponent } from './pages/main/components/package-swiper/package-swiper.component';
import { PartnerBrandsComponent } from './pages/main/components/partner-brands/partner-brands.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { MagazineItemComponent } from './pages/main/components/magazine/magazine-item/magazine-item.component';
import { SearchBarComponent } from './_partials/header/header-menu/top-menu/search-bar/search-bar.component';
import { SearchResultMenuComponent } from './_partials/header/header-menu/top-menu/search-bar/search-result-menu/search-result-menu.component';
import { SwiperModule } from 'swiper/angular';
import { HeaderMobileComponent } from './_partials/header/header-mobile/header-mobile.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AdvertisingBannersComponent } from './pages/main/components/advertising-banners/advertising-banners.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    AmazingOfferSwiperComponent,
    BackgroundSwiperItemComponent,
    KelemanProductCategoryComponent,
    ProductCategoryItemComponent,
    TopSliderComponent,

    ContentComponent,
    HeaderComponent,
    HeaderMenuComponent,
    MegaMenuComponent,
    TopMenuComponent,
    OffCanvasMenuComponent,
    UserDropdownMenuComponent,
    MagazineComponent,
    PackageSwiperComponent,
    PartnerBrandsComponent,
    FooterComponent,
    MagazineItemComponent,
    SearchBarComponent,
    SearchResultMenuComponent,
    HeaderMobileComponent,
    AdvertisingBannersComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    InlineSVGModule,
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
  ],
})
export class LayoutModule {}
