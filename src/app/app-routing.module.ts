import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RatioLoginComponent } from './login-page/ratio-login.component';

const routes: Routes = [
  { path: 'login', component: RatioLoginComponent, },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
      // canActivate:[AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
