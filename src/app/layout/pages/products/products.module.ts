import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
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
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
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
import { ReadMoreComponent } from '../../../shared/components/read-more/read-more.component';
import { RelatedArticlesComponent } from '../../views/shared/related-articles/related-articles.component';
import { BarRatingComponent } from '../../../shared/components/bar-rating/bar-rating.component';
import { ProductSpecializedSpecificationsComponent } from './product-details/widgets/specifications/special-specification/product-specialized-specifications.component';
import { TextWithIconComponent } from '../../../shared/components/text-with-icon/text-with-icon.component';
import { PriceChartDialogComponent } from './product-details/widgets/content/price-chart-dialog/price-chart-dialog.component';
import { ExpertCheckComponent } from './product-details/widgets/specifications/expert-check/expert-check.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSearchComponent } from './product-list/components/product-search/product-search.component';
import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsSortComponent } from './product-list/components/products-sort/products-sort.component';
import { ProductItemComponent } from './product-list/components/product-item/product-item.component';
import { PriceComponent } from '../../../shared/components/price/price.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../shared/directives/empty-image.directive';
import { AddCommentDialogComponent } from './product-details/widgets/comments/add-comment-dialog/add-comment-dialog.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FilterChipListComponent } from './product-list/components/product-filters/components/filter-chip-list/filter-chip-list.component';
import { CategoryFilterComponent } from './product-list/components/product-filters/components/category-filter/category-filter.component';
import { BrandFilterComponent } from './product-list/components/product-filters/components/brand-filter/brand-filter.component';
import { SellerFilterComponent } from './product-list/components/product-filters/components/seller-filter/seller-filter.component';
import { MatComponentsModule } from '../../../mat-components.module';
import { ProductFiltersModule } from './product-list/components/product-filters/product-filters.module';

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
    PriceChartDialogComponent,
    ExpertCheckComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductsSortComponent,
    ProductItemComponent,
    AddCommentDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxImageZoomModule,
    InlineSVGModule,
    MagazineModule,
    HighchartsChartModule,
    SwiperContentDirective,
    SwiperTemplateDirective,
    SwiperComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbNavOutlet,
    PurchaseMobileComponent,
    SwiperItemComponent,
    ReadMoreContentDirective,
    ReadMoreTemplateDirective,
    ReadMoreComponent,
    RelatedArticlesComponent,
    NgbRating,
    BarRatingComponent,
    TextWithIconComponent,
    InputGroupComponent,
    FormsModule,
    PriceComponent,
    LazyLoadingDirective,
    EmptyImageDirective,
    ReactiveFormsModule,
    CardComponent,
    InfiniteScrollModule,
    ProductFiltersModule,
    MatComponentsModule,
  ],
})
export class ProductsModule {}
