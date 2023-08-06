import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagazineComponent } from './magazine.component';
import { ArticleListComponent } from './components/list/article-list.component';
import { ArticleComponent } from './components/article/article.component';

export const routes: Routes = [
  {
    path: '',
    component: MagazineComponent,
    children: [
      { path: ':url', component: ArticleComponent },
      { path: '', component: ArticleListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazineRoutingModule {}
