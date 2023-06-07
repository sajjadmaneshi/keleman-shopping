import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MagazineModule } from './layout/pages/magazine/magazine.module';
import { SwiperComponent } from './shared/components/swiper/swiper.component';
import { ApplicationStateService } from './shared/services/application-state.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { AppErrorHandler } from './shared/common/app-error-handler';
import { MatComponentsModule } from './mat-components.module';
import { FloatingButtonMenuComponent } from './shared/components/floating-button-menu/floating-button-menu.component';
import { SwiperModule } from 'swiper/angular';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): any {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    SwiperModule,
    MagazineModule,
    SwiperComponent,
    LeafletModule,
    FloatingButtonMenuComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    }),
  ],
  providers: [
    ApplicationStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
