import { NgModule } from '@angular/core';
import { ProductCommentsComponent } from './product-comments.component';
import { ProductCommentItemComponent } from './comment-item/product-comment-item.component';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { ProductCommentsDialogComponent } from './comments-dialog/product-comments-dialog.component';
import { SwiperComponent } from '../../../../../../shared/components/swiper/swiper.component';
import { CommonModule } from '@angular/common';
import { TextWithIconComponent } from '../../../../../../shared/components/text-with-icon/text-with-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { MatSliderModule } from '@angular/material/slider';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../../../../shared/directives/swiper-template.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';
import { LoadingProgressDirective } from '../../../../../../shared/directives/loading-progress.directive';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProductCommentsComponent,
    ProductCommentItemComponent,
    AddCommentDialogComponent,
    ProductCommentsDialogComponent,
  ],
  imports: [
    CommonModule,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
    TextWithIconComponent,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    MatSliderModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    LoadingProgressDirective,
    NgbRating,
    MatIconModule,
  ],
  exports: [ProductCommentsComponent, ProductCommentItemComponent],
})
export class ProductCommentsModule {}
