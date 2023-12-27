import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { HighchartsChartModule } from 'highcharts-angular';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { ProductNavbarComponent } from './product-details/components/navbar/product-navbar.component';
import { ProductAlbumComponent } from './product-details/components/album/product-album.component';
import { ProductMetaComponent } from './product-details/components/meta/product-meta.component';
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
import {
  NgbAccordionModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductSpecificationsComponent } from './product-details/components/specifications/product-specifications.component';
import { ProductIntroductionComponent } from './product-details/components/specifications/introduction/product-introduction.component';
import { ProductContentComponent } from './product-details/components/content/product-content.component';
import { RelatedProductsComponent } from './product-details/components/relateds/related-products.component';
import { SwiperItemComponent } from '../../../shared/components/swiper/swiper-item/swiper-item.component';
import {
  ReadMoreContentDirective,
  ReadMoreTemplateDirective,
} from '../../../shared/directives/read-more-list-template.directive';

import { ProductSpecializedSpecificationsComponent } from './product-details/components/specifications/special-specification/product-specialized-specifications.component';
import { TextWithIconComponent } from '../../../shared/components/text-with-icon/text-with-icon.component';
import { PriceChartDialogComponent } from './product-details/components/content/price-chart-dialog/price-chart-dialog.component';
import { ExpertCheckComponent } from './product-details/components/specifications/expert-check/expert-check.component';
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
import { CardComponent } from '../../../shared/components/card/card.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { ProductFiltersModule } from './product-list/components/product-filters/product-filters.module';
import { FAQComponent } from './product-details/components/faq/faq.component';
import { FaqItemComponent } from './product-details/components/faq/faq-item/faq-item.component';
import { AddQuestionDialogComponent } from './product-details/components/faq/add-question-dialog/add-question-dialog.component';
import { FaqListDialogComponent } from './product-details/components/faq/faq-list-dialog/faq-list-dialog.component';
import { ProductCategoryComponent } from '../../../home/components/product-category/product-category.component';
import { ProductCommentsModule } from './product-details/components/comments/product-comments.module';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CategoryAboutComponent } from './product-list/components/category-about/category-about.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouteHandlerService } from '../../../shared/services/route-handler/route-handler.service';
import { ProductFilterService } from './services/product-filter.service';
import { BreadCrumbComponent } from '../../../shared/components/bread-crumb/bread-crumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackgroundSwiperItemComponent } from '../../../home/components/background-swiper/background-swiper-item/background-swiper-item.component';
import { LoadingProgressDirective } from '../../../shared/directives/loading-progress.directive';
import { ShareDialogComponent } from './product-details/components/content/share-dialog/share-dialog.component';
import { MagazineModule } from '../magazine/magazine.module';
import { ValueChangerComponent } from '../../../shared/components/value-changer/value-changer.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductSpecializedSpecificationsComponent,
    ProductNavbarComponent,
    ProductAlbumComponent,
    ProductMetaComponent,
    ProductSpecificationsComponent,
    ProductIntroductionComponent,
    ProductContentComponent,
    RelatedProductsComponent,
    PriceChartDialogComponent,
    ExpertCheckComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductsSortComponent,
    ProductItemComponent,
    FAQComponent,
    FaqItemComponent,
    AddQuestionDialogComponent,
    FaqListDialogComponent,
    CategoryAboutComponent,
    ShareDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxImageZoomModule,
    HighchartsChartModule,
    SwiperContentDirective,
    SwiperTemplateDirective,
    SwiperComponent,
    SwiperItemComponent,
    NgbNavModule,
    ReadMoreContentDirective,
    ReadMoreTemplateDirective,
    NgbRatingModule,
    TextWithIconComponent,
    InputGroupComponent,
    FormsModule,
    PriceComponent,
    LazyLoadingDirective,
    EmptyImageDirective,
    ReactiveFormsModule,
    CardComponent,
    ProductFiltersModule,
    BottomSheetComponent,
    ProductCategoryComponent,
    ProductCommentsModule,
    PaginationComponent,
    NgxSkeletonLoaderModule,
    SwiperModule,
    NgbAccordionModule,
    MatIconModule,
    MatDialogModule,
    BreadCrumbComponent,
    MatProgressSpinnerModule,
    BackgroundSwiperItemComponent,
    LoadingProgressDirective,
    MagazineModule,
    ValueChangerComponent,
  ],

  providers: [ProductFilterService, RouteHandlerService],
  exports: [ProductItemComponent, ProductSearchComponent],
})
export class ProductsModule {}
