import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../service/user-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule],
})
export class FilterComponent {
  newArr: User[] = [];
  selectedOptionValue?: boolean;

  inputVal: string;
  inputStol: number;
  inputMesto: number;
  options: Array<{ value: boolean | undefined; label: string }> = [
    { value: undefined, label: 'Все статусы рации' },
    { value: true, label: 'Рация включена' },
    { value: false, label: 'Рация выключена' },
  ];

  @Output() inputValChange = new EventEmitter<{}>();
  @Output() newItemAdded = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  getInputVal() {
    this.inputValChange.emit({
      employdId: this.inputVal,
      tableNumber: this.inputStol,
      placeNumber: this.inputMesto,
      radioStatus: this.selectedOptionValue,
    });
  }

  onDelete() {
    this.inputStol = null;
    this.inputMesto = null;
    this.inputValChange.emit({
      inpuName: this.inputVal,
      inputStol: this.inputStol,
      inputMesto: this.inputMesto,
      radioStatus: this.selectedOptionValue,
    });
  }

  openDialog(): void {
    this.dialog
      .open(ModalComponent, {})
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) {
          this.newItemAdded.emit();
        }
      });
  }
}

interface User {
  id: number;
  fullName: string;
  tagId: number;
  lastRegistry: string;
  tableNumber: number;
  placeNumber: number;
  placeOfLastSynchronization: string;
  radioStatus: boolean;
  radioNumber: number;
}
