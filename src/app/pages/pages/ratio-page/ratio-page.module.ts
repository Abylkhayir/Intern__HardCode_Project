import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatioTableComponent } from './ratio-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from '../../../components/filter/filter.component';
import { UsersComponent } from '../../../components/users/users.component';
import { AddRadioComponent } from '../../../components/add-radio/add-radio.component';



const routes: Routes = [
  {
    path: '',
    component: RatioTableComponent
  },
];

@NgModule({
  declarations: [ RatioTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FilterComponent,
    UsersComponent,
    AddRadioComponent
  ],
  providers: [],
})
export class RatioPageModule {}
