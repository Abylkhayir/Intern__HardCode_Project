import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatioTableComponent } from './pages/ratio-page/ratio-table.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../authorization/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [AuthGuard], // Добавляем AuthGuard здесь
    children: [
      { path: '', redirectTo: 'ratio-list', pathMatch: 'full' },
      {
        path: 'ratio-list',
        loadChildren: () =>
          import('./pages/ratio-page/ratio-page.module').then(
            (m) => m.RatioPageModule
          ),
      },
      // { path: not-found', component: notFoundCompopoe },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
