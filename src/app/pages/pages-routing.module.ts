import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatioTableComponent } from './pages/ratio-page/ratio-table.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'ratio-list', pathMatch: 'full' },
      { path: 'ratio-list', component: RatioTableComponent },
      // { path: not-found', component: notFoundCompopoe },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
