import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MagazineComponent } from './magazine.component';
import { SuggestionComponent } from './components/list/suggestion/suggestion.component';
import { SwiperModule } from 'swiper/angular';
import { SuggestionSliderItemComponent } from './components/list/suggestion/suggestion-slider-item/suggestion-slider-item.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { MagazineRoutingModule } from './magazine-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KelemanPaginationComponent } from '../../../../shared/components/keleman-pagination/keleman-pagination.component';

export const routes: Routes = [{ path: '', component: MagazineComponent }];

@NgModule({
  declarations: [
    MagazineComponent,
    SuggestionComponent,
    ListItemComponent,
    ListComponent,
    CommentComponent,
  ],
  exports: [CommentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    SuggestionSliderItemComponent,
    MagazineRoutingModule,
    ReactiveFormsModule,
    KelemanPaginationComponent,
  ],
})
export class MagazineModule {}
