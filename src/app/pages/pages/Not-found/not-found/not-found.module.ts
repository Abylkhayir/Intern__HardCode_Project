import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class NotFoundModule {}