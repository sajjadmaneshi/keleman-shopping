import { inject, NgModule } from '@angular/core';
import {
  BaseRouteReuseStrategy,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { NotFoundComponent } from './layout/pages/not-found/not-found.component';
import { Routing } from './routing';
import { TokenResolver } from './shared/resolvers/token.resolver';
import { CustomRouteReuseStrategy } from './shared/custom-route-reuse-strategy';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: Routing.register,
    loadComponent: () =>
      import('./authentication/register/register.component').then(
        (c) => c.RegisterComponent
      ),

    resolve: { token: () => inject(TokenResolver).resolve() },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    TokenResolver,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
