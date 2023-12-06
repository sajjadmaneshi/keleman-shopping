import { inject, Inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CanonicalResolver } from '../../common/resolvers/canonical.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    data: {
      shouldDetach: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
