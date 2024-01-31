import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FilterComponent {
  selectedOption: string;
  inputVal: string;
  inputStol: number;
  inputMesto: number;
  @Output() inputValChange = new EventEmitter<{}>();

  constructor() {
    this.selectedOption = this.options[0].value;
  }

  getInputVal() {
    this.inputValChange.emit({
      inputVal: this.inputVal,
      inputStol: this.inputStol,
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
}
