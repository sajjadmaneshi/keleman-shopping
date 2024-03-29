import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazineComponent } from './magazine.component';
import { MagazineListComponent } from './components/list/magazine-list.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { ArticleCommentsComponent } from './components/comment/article-comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleItemComponent } from '../../../shared/components/article-item/article-item.component';
import { ArticleComponent } from './components/article/article.component';
import { LatestArticlesComponent } from './components/latest-articles/latest-articles.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { MatIconModule } from '@angular/material/icon';
import { ArticleLinkListDirective } from './components/article/article-link-list.directive';
import { ArticleItemThumbnailComponent } from '../../../shared/components/article-item-thumbnail/article-item-thumbnail.component';

import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { EmptyImageDirective } from '../../../shared/directives/empty-image.directive';
import { BreadCrumbComponent } from '../../../shared/components/bread-crumb/bread-crumb.component';
import { MatListModule } from '@angular/material/list';
import { LoadingProgressDirective } from '../../../shared/directives/loading-progress.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MagazineComponent,
    ArticleComponent,
    MagazineListComponent,
    ArticleCommentsComponent,
    LatestArticlesComponent,
    ShareButtonsComponent,
  ],
  imports: [
    CommonModule,
    MagazineRoutingModule,
    ReactiveFormsModule,
    ArticleItemComponent,
    LazyLoadingDirective,
    MatIconModule,
    ArticleLinkListDirective,
    ArticleItemThumbnailComponent,
    NgxSkeletonLoaderModule,
    PaginationComponent,
    EmptyImageDirective,
    BreadCrumbComponent,
    MatListModule,
    LoadingProgressDirective,
    FontAwesomeModule,
    MatButtonModule,
  ],
  exports: [ShareButtonsComponent],
})
export class MagazineModule {}
