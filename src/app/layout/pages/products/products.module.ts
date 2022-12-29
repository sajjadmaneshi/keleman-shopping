import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SwiperModule } from 'swiper/angular';
import { BarRatingModule } from 'ngx-bar-rating';
import { CommentsComponent } from './product-details/components/comments/comments.component';
import { CommentItemComponent } from './product-details/components/comments/comment-item/comment-item.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MagazineModule } from '../magazine/magazine.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    CommentsComponent,
    CommentItemComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxImageZoomModule,
    SwiperModule,
    BarRatingModule,
    InlineSVGModule,
    MagazineModule,
  ],
})
export class ProductsModule {}
