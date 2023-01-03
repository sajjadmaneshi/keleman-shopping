import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SwiperModule } from 'swiper/angular';
import { BarRatingModule } from 'ngx-bar-rating';
import { ProductCommentsComponent } from './product-details/widgets/comments/product-comments.component';
import { CommentItemComponent } from './product-details/widgets/comments/comment-item/comment-item.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MagazineModule } from '../magazine/magazine.module';
import { PriceChartComponent } from './product-details/widgets/price-chart/price-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { ProductNavbarComponent } from './product-details/widgets/navbar/product-navbar.component';
import { ProductAlbumComponent } from './product-details/widgets/album/product-album.component';
import { ProductMetaComponent } from './product-details/widgets/meta/product-meta.component';
import { KelemanSwiperComponent } from '../../../shared/components/keleman-swiper/keleman-swiper.component';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductSpecificationsComponent } from './product-details/widgets/specifications/product-specifications.component';
import { ProductCheckingComponent } from './product-details/widgets/checking/product-checking.component';
import { ProductRateComponent } from './product-details/widgets/rate/product-rate.component';
import { ProductContentComponent } from './product-details/widgets/content/product-content.component';
import { LayoutModule } from '../../layout.module';
import { ProductRelatesComponent } from './product-details/widgets/relateds/product-relates.component';
import { PurchaseMobileComponent } from '../../views/mobile/purchase-mobile/purchase-mobile.component';
import { SwiperItemComponent } from '../../views/shared/swiper-item/swiper-item.component';
import {
  ReadMoreContentDirective,
  ReadMoreTemplateDirective,
} from '../../../shared/directives/read-more-list-template.directive';
import { KelemanReadMoreComponent } from '../../../shared/components/keleman-read-more/keleman-read-more.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductCommentsComponent,
    CommentItemComponent,
    PriceChartComponent,
    ProductNavbarComponent,
    ProductAlbumComponent,
    ProductMetaComponent,
    ProductSpecificationsComponent,
    ProductCheckingComponent,
    ProductRateComponent,
    ProductContentComponent,
    ProductRelatesComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxImageZoomModule,
    SwiperModule,
    BarRatingModule,
    InlineSVGModule,
    MagazineModule,
    HighchartsChartModule,
    SwiperContentDirective,
    SwiperTemplateDirective,
    KelemanSwiperComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbNavOutlet,
    LayoutModule,
    PurchaseMobileComponent,
    SwiperItemComponent,
    ReadMoreContentDirective,
    ReadMoreTemplateDirective,
    KelemanReadMoreComponent,
  ],
})
export class ProductsModule {}
