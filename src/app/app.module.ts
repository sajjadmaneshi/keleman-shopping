import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SwiperModule} from "swiper/angular";
import { ArticleComponent } from './layout/pages/magazine/components/article/article.component';
import {MatChipsModule} from "@angular/material/chips";
import {InlineSVGModule} from "ng-inline-svg-2";
import {MagazineModule} from "./layout/pages/magazine/magazine.module";
import {CarouselSliderComponent} from "../shared/components/carousel-slider/carousel-slider.component";
import {CarouselItemComponent} from "../shared/components/carousel-slider/carousel-item/carousel-item.component";


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent
  ],
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
        CarouselSliderComponent,
        CarouselItemComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
