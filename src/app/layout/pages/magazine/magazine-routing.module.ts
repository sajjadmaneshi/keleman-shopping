import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagazineComponent } from './magazine.component';
import { MagazineListComponent } from './components/list/magazine-list.component';
import { ArticleComponent } from './components/article/article.component';

export const routes: Routes = [
  {
    path: '',
    component: MagazineComponent,
    children: [
      { path: 'detail/:url', component: ArticleComponent },
      {
        path: ':categoryUrl',
        component: MagazineListComponent,
        data: {
          shouldDetach: true,
        },
      },
      {
        path: '',
        component: MagazineListComponent,
        data: {
          shouldDetach: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazineRoutingModule {}
