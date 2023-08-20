import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MagazineComponent } from './magazine.component';
import { ArticleListComponent } from './components/list/article-list.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleItemComponent } from '../../../shared/components/article-item/article-item.component';
import { ArticleComponent } from './components/article/article.component';
import { LatestArticlesComponent } from './components/latest-articles/latest-articles.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { MatIconModule } from '@angular/material/icon';
import { ArticleLinkListDirective } from './components/article/article-link-list.directive';
import { ArticleItemThumbnailComponent } from '../../../shared/components/article-item-thumbnail/article-item-thumbnail.component';
import { CommentsModule } from '../../../shared/components/comments/comments.module';
import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import {EmptyImageDirective} from "../../../shared/directives/empty-image.directive";

export const routes: Routes = [{ path: '', component: MagazineComponent }];

@NgModule({
  declarations: [
    MagazineComponent,
    ArticleComponent,
    ArticleListComponent,
    CommentComponent,
    LatestArticlesComponent,
    ShareButtonsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MagazineRoutingModule,
    ReactiveFormsModule,
    ArticleItemComponent,
    LazyLoadingDirective,
    MatIconModule,
    ArticleLinkListDirective,
    ArticleItemThumbnailComponent,
    CommentsModule,
    NgxSkeletonLoaderModule,
    PaginationComponent,
    EmptyImageDirective,
  ],
})
export class MagazineModule {}
