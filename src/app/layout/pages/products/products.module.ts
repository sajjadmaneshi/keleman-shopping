import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SwiperModule } from 'swiper/angular';
import { ProductCommentsComponent } from './product-details/widgets/comments/product-comments.component';
import { CommentItemComponent } from './product-details/widgets/comments/comment-item/comment-item.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MagazineModule } from '../magazine/magazine.module';
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
  NgbRating,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductSpecificationsComponent } from './product-details/widgets/specifications/product-specifications.component';
import { ProductIntroductionComponent } from './product-details/widgets/specifications/introduction/product-introduction.component';
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
import { RelatedArticlesComponent } from '../../views/shared/related-articles/related-articles.component';
import { KelemanBarRatingComponent } from '../../../shared/components/keleman-bar-rating/keleman-bar-rating.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductSpecializedSpecificationsComponent } from './product-details/widgets/specifications/special-specification/product-specialized-specifications.component';
import { KelemanIconTextComponent } from '../../../shared/components/keleman-icon-text/keleman-icon-text.component';
import { PriceChartDialogComponent } from './product-details/widgets/content/price-chart-dialog/price-chart-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpertCheckComponent } from './product-details/widgets/specifications/expert-check/expert-check.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductSpecializedSpecificationsComponent,
    ProductCommentsComponent,
    CommentItemComponent,
    ProductNavbarComponent,
    ProductAlbumComponent,
    ProductMetaComponent,
    ProductSpecificationsComponent,
    ProductIntroductionComponent,
    ProductRateComponent,
    ProductContentComponent,
    ProductRelatesComponent,
    ProductSpecializedSpecificationsComponent,
    PriceChartDialogComponent,
    ExpertCheckComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxImageZoomModule,
    SwiperModule,
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
    RelatedArticlesComponent,
    NgbRating,
    KelemanBarRatingComponent,
    MatIconModule,
    KelemanIconTextComponent,
    MatDialogModule,
  ],
})
export class ProductsModule {}
