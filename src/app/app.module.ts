import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'swiper/angular';
import { ArticleComponent } from './layout/pages/magazine/components/article/article.component';
import { MatChipsModule } from '@angular/material/chips';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MagazineModule } from './layout/pages/magazine/magazine.module';
import { KelemanSwiperComponent } from '../shared/components/keleman-swiper/keleman-swiper.component';
import { KelemanProductSwiperItemComponent } from '../shared/components/keleman-swiper/keleman-product-swiper-item/keleman-product-swiper-item.component';
import { ApplicationStateService } from '../shared/services/application-state.service';

@NgModule({
  declarations: [AppComponent, ArticleComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SwiperModule,
    MatChipsModule,
    InlineSVGModule,
    MagazineModule,
    KelemanSwiperComponent,
    KelemanProductSwiperItemComponent,
  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
