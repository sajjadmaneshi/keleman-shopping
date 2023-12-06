import { inject, NgModule } from '@angular/core';
import {
  BaseRouteReuseStrategy,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { NotFoundComponent } from './layout/pages/not-found/not-found.component';
import { Routing } from './routing';
import { TokenResolver } from '../common/resolvers/token.resolver';
import { CustomRouteReuseStrategy } from './shared/custom-route-reuse-strategy';
import { CanonicalResolver } from 'src/common/resolvers/canonical.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: Routing.register,
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),

    resolve: {
      token: () => inject(TokenResolver).resolve(),
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 150],
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    TokenResolver,
    CanonicalResolver,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
