import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authorization/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
