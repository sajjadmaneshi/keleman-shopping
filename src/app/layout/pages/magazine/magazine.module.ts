import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MagazineComponent } from './magazine.component';

import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [{ path: '', component: MagazineComponent }];

@NgModule({
  declarations: [
    MagazineComponent,
    ListItemComponent,
    ListComponent,
    CommentComponent,
  ],
  exports: [CommentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MagazineRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MagazineModule {}
