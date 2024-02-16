import { Component } from '@angular/core';

@Component({
  selector: 'app-ratio-table',
  templateUrl: './ratio-table.component.html',
  styleUrl: './ratio-table.component.css',
})
export class RatioTableComponent {
  inputVal: object;
  newItemAdded: boolean;
  updateInputVal(newValue: object) {
    this.inputVal = newValue;
    console.log('Updated inputVal:', this.inputVal);
  }

  onNewItemAdded(): void {
    this.newItemAdded = !this.newItemAdded;
  }
}
