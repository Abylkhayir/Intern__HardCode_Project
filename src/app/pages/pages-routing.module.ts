import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../authorization/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'ratio-list', pathMatch: 'full' },
      {
        path: 'ratio-list',
        loadChildren: () =>
          import('./pages/ratio-page/ratio-page.module').then(
            (m) => m.RatioPageModule
          ),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./pages/Not-found/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
