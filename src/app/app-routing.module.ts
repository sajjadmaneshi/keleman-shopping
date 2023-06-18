import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './layout/pages/not-found/not-found.component';
import { Routing } from './routing';
import { RegisterComponent } from './layout/pages/authentication/register/register.component';
import { TokenResolver } from './shared/resolvers/token.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: Routing.register,
    component: RegisterComponent,
    resolve: { token: () => inject(TokenResolver).resolve() },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
    }),
  ],
  providers: [TokenResolver],
  exports: [RouterModule],
})
export class AppRoutingModule {}
