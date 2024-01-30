import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { RatioTableComponent } from './pages/ratio-page/ratio-table.component';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import {DropdownInputComponent} from '../components/dropdown-input/dropdown-input.component'

@NgModule({
  declarations: [PagesComponent, RatioTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    PagesRoutingModule,
    HeaderComponent,
	 DropdownInputComponent
  ],
  providers: [],
  bootstrap: [PagesComponent],
})
export class PagesModule {}
