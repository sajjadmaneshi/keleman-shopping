import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { KelemanValueChangerComponent } from '../shared/components/keleman-value-changer/keleman-value-changer.component';
import { MainComponent } from './pages/main/main.component';
import { SwiperModule } from 'swiper/angular';
import { KelemanSwiperComponent } from '../shared/components/keleman-swiper/keleman-swiper.component';
import { AmazingOfferSwiperComponent } from './pages/main/components/background-swiper/amazing-offer-swiper/amazing-offer-swiper.component';
import { BackgroundSwiperItemComponent } from './pages/main/components/background-swiper/background-swiper-item/background-swiper-item.component';
import { ElevatorPackagesSwiperComponent } from './pages/main/components/background-swiper/elevator-packages-swiper/elevator-packages-swiper.component';
import { KelemanProductCategoryComponent } from './pages/main/components/product-category/keleman-product-category.component';
import { ProductCategoryItemComponent } from './views/shared/product-category-item/product-category-item.component';
import { ImageResponsiveDirective } from '../shared/directives/image-responsive.directive';
import { TopSliderComponent } from './pages/main/components/top-slider/top-slider.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownComponent } from 'ngx-countdown';
import { MatIconModule } from '@angular/material/icon';
import { TypesOfMotorComponent } from './pages/main/components/types-of-motor/types-of-motor.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../shared/directives/swiper-template.directive';
import { KelemanPriceComponent } from '../shared/components/keleman-price/keleman-price.component';
import { ProductCategoryMobileComponent } from './views/mobile/product-category-mobile/product-category-mobile.component';
import { ProductCategoryWebComponent } from './views/web/product-category-web/product-category-web.component';
import { ContentComponent } from './_partials/content/content.component';
import { SwiperItemComponent } from './views/shared/swiper-item/swiper-item.component';
import { KelemanInputGroupComponent } from '../shared/components/keleman-input-group/keleman-input-group.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { HeaderComponent } from './_partials/header/header.component';
import { HeaderMenuComponent } from './_partials/header/header-menu/header-menu.component';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { MegaMenuComponent } from './_partials/header/header-menu/mega-menu/mega-menu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    AmazingOfferSwiperComponent,
    BackgroundSwiperItemComponent,
    ElevatorPackagesSwiperComponent,
    KelemanProductCategoryComponent,
    ProductCategoryItemComponent,
    TopSliderComponent,
    RegisterComponent,
    TypesOfMotorComponent,
    ProductCategoryMobileComponent,
    ProductCategoryWebComponent,
    ContentComponent,
    HeaderComponent,
    HeaderMenuComponent,
    MegaMenuComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    InlineSVGModule,
    KelemanValueChangerComponent,
    SwiperModule,
    NgOptimizedImage,
    KelemanSwiperComponent,
    ImageResponsiveDirective,
    NgOtpInputModule,
    CountdownComponent,
    MatIconModule,
    SwiperContentDirective,
    SwiperTemplateDirective,
    KelemanPriceComponent,
    SwiperItemComponent,
    KelemanInputGroupComponent,
    NgxShimmerLoadingModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
  ],
  exports: [ContentComponent],
})
export class LayoutModule {}
