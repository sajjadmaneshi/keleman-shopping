import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './home.component';
import { TopSliderComponent } from './components/top-slider/top-slider.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { AmazingOfferSwiperComponent } from './components/background-swiper/amazing-offer-swiper/amazing-offer-swiper.component';
import { BackgroundSwiperItemComponent } from './components/background-swiper/background-swiper-item/background-swiper-item.component';
import { AdvertisingBannersComponent } from './components/advertising-banners/advertising-banners.component';
import { AboutUsSummaryComponent } from './components/about-us-summary/about-us-summary.component';
import { PackageSwiperComponent } from './components/package-swiper/package-swiper.component';
import { MainPageLatestArticlesComponent } from './components/main-page-latest-articles/main-page-latest-articles.component';
import { PartnerBrandsComponent } from './components/partner-brands/partner-brands.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from '../shared/components/swiper/swiper.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../shared/directives/swiper-template.directive';
import { LazyLoadingDirective } from '../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../shared/directives/empty-image.directive';
import { ArticleItemComponent } from '../shared/components/article-item/article-item.component';
import { TextWithIconComponent } from '../shared/components/text-with-icon/text-with-icon.component';
import { PriceComponent } from '../shared/components/price/price.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    TopSliderComponent,
    AmazingOfferSwiperComponent,
    AdvertisingBannersComponent,
    AboutUsSummaryComponent,
    PackageSwiperComponent,
    PartnerBrandsComponent,
    MainPageLatestArticlesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCategoryComponent,
    NgxSkeletonLoaderModule,
    SwiperModule,
    NgOptimizedImage,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
    LazyLoadingDirective,
    EmptyImageDirective,
    ArticleItemComponent,
    TextWithIconComponent,
    PriceComponent,
    BackgroundSwiperItemComponent,
  ],
})
export class HomeModule {}
