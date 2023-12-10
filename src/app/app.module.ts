import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  isDevMode,
} from '@angular/core';
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
import { AppErrorHandler } from '../common/errors/app-error-handler';
import { FloatingButtonMenuComponent } from './shared/components/floating-button-menu/floating-button-menu.component';
import { SwiperModule } from 'swiper/angular';
import { JwtModule } from '@auth0/angular-jwt';
import { InitialAppService } from './shared/services/initial-app.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BasketRepository } from './layout/pages/checkout/data/repositories/basket.repository';

export function initializeApp(
  initialAppService: InitialAppService
): () => void {
  return () => initialAppService.init();
}

export function tokenGetter() {
  return localStorage.getItem('KELEMAN_TOKEN');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FloatingButtonMenuComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    BasketRepository,
    ApplicationStateService,
    InitialAppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitialAppService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
