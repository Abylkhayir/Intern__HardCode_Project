import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrl: './dropdown-input.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class DropdownInputComponent {
	toppings = new FormControl();

	toppingList: string[] = ['Включены', 'Выключены'];
 }
