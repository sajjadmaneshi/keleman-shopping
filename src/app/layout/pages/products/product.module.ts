import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { HighchartsChartModule } from 'highcharts-angular';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';

import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
import {
  NgbAccordionModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SwiperItemComponent } from '../../../shared/components/swiper/swiper-item/swiper-item.component';

import { TextWithIconComponent } from '../../../shared/components/text-with-icon/text-with-icon.component';

import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PriceComponent } from '../../../shared/components/price/price.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../shared/directives/empty-image.directive';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';

import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { BreadCrumbComponent } from '../../../shared/components/bread-crumb/bread-crumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackgroundSwiperItemComponent } from '../../../home/components/background-swiper/background-swiper-item/background-swiper-item.component';
import { LoadingProgressDirective } from '../../../shared/directives/loading-progress.directive';

import { MagazineModule } from '../magazine/magazine.module';
import { ValueChangerComponent } from '../../../shared/components/value-changer/value-changer.component';

import { AutoCompleteComponent } from '../../../shared/components/auto-complete/auto-complete.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

import { MatListModule } from '@angular/material/list';
import { ProductCategoryItemsComponent } from 'src/app/shared/components/product-category/product-category-items.component';

import { CheckoutModule } from '../checkout/checkout.module';
import { EmptyContentComponent } from '../profile/empty-content/empty-content.component';
import { ProductSpecializedSpecificationsComponent } from './components/specifications/special-specification/product-specialized-specifications.component';
import { ProductNavbarComponent } from './components/navbar/product-navbar.component';
import { ProductGalleryComponent } from './components/gallery/product-gallery.component';
import { ProductMetaComponent } from './components/meta/product-meta.component';
import { ProductSpecificationsComponent } from './components/specifications/product-specifications.component';
import { ProductIntroductionComponent } from './components/specifications/introduction/product-introduction.component';
import { ProductContentComponent } from './components/content/product-content.component';
import { RelatedProductsComponent } from './components/relateds/related-products.component';
import { PriceChartDialogComponent } from './components/content/price-chart-dialog/price-chart-dialog.component';
import { ExpertCheckComponent } from './components/specifications/expert-check/expert-check.component';
import { FAQComponent } from './components/faq/faq.component';
import { FaqItemComponent } from './components/faq/faq-item/faq-item.component';
import { AddQuestionDialogComponent } from './components/faq/add-question-dialog/add-question-dialog.component';
import { FaqListDialogComponent } from './components/faq/faq-list-dialog/faq-list-dialog.component';
import { ShareDialogComponent } from './components/content/share-dialog/share-dialog.component';
import { ProductCommentsModule } from './components/comments/product-comments.module';
import { StoresComponent } from './components/stores/stores.component';
import { PropertyOptionsComponent } from './components/property-options/property-options.component';
import { GoToBasketBottomSheetComponent } from './components/go-to-basket/go-to-basket-bottom-sheet/go-to-basket-bottom-sheet.component';
import { ModifyMetaDataService } from '../../../../common/services/modify-meta-data.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductSpecializedSpecificationsComponent,
    ProductNavbarComponent,
    ProductGalleryComponent,
    ProductMetaComponent,
    ProductSpecificationsComponent,
    ProductIntroductionComponent,
    ProductContentComponent,
    RelatedProductsComponent,
    PriceChartDialogComponent,
    ExpertCheckComponent,
    FAQComponent,
    FaqItemComponent,
    AddQuestionDialogComponent,
    FaqListDialogComponent,
    ShareDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxImageZoomModule,
    HighchartsChartModule,
    SwiperContentDirective,
    SwiperTemplateDirective,
    SwiperComponent,
    SwiperItemComponent,
    NgbNavModule,
    NgbRatingModule,
    TextWithIconComponent,
    InputGroupComponent,
    FormsModule,
    PriceComponent,
    LazyLoadingDirective,
    EmptyImageDirective,
    ReactiveFormsModule,
    CardComponent,
    BottomSheetComponent,
    ProductCategoryItemsComponent,
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
    StoresComponent,
    AutoCompleteComponent,
    LoaderComponent,
    PropertyOptionsComponent,
    MatListModule,
    GoToBasketBottomSheetComponent,
    CheckoutModule,
    EmptyContentComponent,
  ],
})
export class ProductModule {}
