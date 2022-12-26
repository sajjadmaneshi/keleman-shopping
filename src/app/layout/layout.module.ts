import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LayoutRoutingModule} from "./layout-routing.module";
import {LayoutComponent} from "./layout.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {
  ValueChangerComponent
} from "./pages/basket/components/basket-item/widgets/value-changer/value-changer.component";
import { MainComponent } from './pages/main/main.component';
import {SwiperModule} from "swiper/angular";
import {CarouselSliderComponent} from "../../shared/components/carousel-slider/carousel-slider.component";
import { AmazingOfferSwiperComponent } from './pages/main/components/amazing-offer-swiper/amazing-offer-swiper.component';
import { AmazingOfferItemComponent } from './pages/main/components/amazing-offer-swiper/amazing-offer-item/amazing-offer-item.component';
import { ElevatorPackagesSwiperComponent } from './pages/main/components/elevator-packages-swiper/elevator-packages-swiper.component';
import { ProductCategoryComponent } from './pages/main/components/product-category-swiper/product-category.component';
import { ProductCategoryItemComponent } from './pages/main/components/product-category-swiper/product-category-item/product-category-item.component';





@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    AmazingOfferSwiperComponent,
    AmazingOfferItemComponent,
    ElevatorPackagesSwiperComponent,
    ProductCategoryComponent,
    ProductCategoryItemComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    InlineSVGModule,
    ValueChangerComponent,
    SwiperModule,
    NgOptimizedImage,
    CarouselSliderComponent
  ]
})
export class LayoutModule { }
