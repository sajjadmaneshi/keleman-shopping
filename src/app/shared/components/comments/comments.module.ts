import { NgModule } from '@angular/core';
import { CommentsComponent } from './comments.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { CommonModule } from '@angular/common';
import { TextWithIconComponent } from '../text-with-icon/text-with-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../directives/swiper-template.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentItemComponent,
    AddCommentDialogComponent,
    CommentsDialogComponent,
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
    MatIconModule,
    MatSliderModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [CommentsComponent, CommentItemComponent],
})
export class CommentsModule {}
