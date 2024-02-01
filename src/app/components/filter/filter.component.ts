import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddRadioComponent } from '../add-radio/add-radio.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from '../users/users.component';
import {
	MatDialog,
	MatDialogRef,
	MatDialogActions,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,
 } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    AddRadioComponent,
    UsersComponent,
	 MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
})
export class FilterComponent {
  selectedOption: string;
  inputVal: string;
  inputStol: number;
  inputMesto: number;
  @Output() inputValChange = new EventEmitter<{}>();

  constructor(public dialog: MatDialog) {
    this.selectedOption = this.options[0].value;
  }

  getInputVal() {
    this.inputValChange.emit({
      inputName: this.inputVal,
      inputStol: this.inputStol,
      inputMesto: this.inputMesto,
    });
  }

  onDelete() {
    this.inputStol = null;
    this.inputMesto = null;
    this.inputValChange.emit({
      inpuName: this.inputVal,
      inputStol: this.inputStol,
      inputMesto: this.inputMesto,
    });
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
  }

  options: Array<{ value: string; label: string }> = [
    { value: 'option1', label: 'Все статусы рации' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  openDialog(): void {
    this.dialog.open(AddRadioComponent, {});
  }
}
