import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../components';
@NgModule({
  declarations: [PagesComponent,],
  imports: [
    PagesRoutingModule,
    HeaderComponent
  ],
  providers: [],
})
export class PagesModule {}
