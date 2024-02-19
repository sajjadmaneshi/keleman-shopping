import { NgModule } from '@angular/core';
import { ProductCommentsComponent } from './product-comments.component';
import { ProductCommentItemComponent } from './comment-item/product-comment-item.component';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { ProductCommentsDialogComponent } from './comments-dialog/product-comments-dialog.component';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';

import { MatDialogModule } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';

import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { SwiperComponent } from '../../../../../shared/components/swiper/swiper.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../../../shared/directives/swiper-template.directive';
import { TextWithIconComponent } from '../../../../../shared/components/text-with-icon/text-with-icon.component';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { LoadingProgressDirective } from '../../../../../shared/directives/loading-progress.directive';

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
