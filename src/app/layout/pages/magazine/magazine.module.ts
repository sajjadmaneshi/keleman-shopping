import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MagazineComponent } from './magazine.component';

import { ArticleListComponent } from './components/list/article-list.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../../../app.module';
import { ArticleItemComponent } from '../../../shared/components/article-item/article-item.component';
import { ArticleComponent } from './components/article/article.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LatestArticlesComponent } from './components/latest-articles/latest-articles.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';

export const routes: Routes = [{ path: '', component: MagazineComponent }];

@NgModule({
  declarations: [
    MagazineComponent,
    ArticleComponent,
    ArticleListComponent,
    CommentComponent,
    LatestArticlesComponent,
  ],
  exports: [CommentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MagazineRoutingModule,
    ReactiveFormsModule,
    ArticleItemComponent,
    InlineSVGModule,
    LazyLoadingDirective,
  ],
})
export class MagazineModule {}
