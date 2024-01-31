import { Component } from '@angular/core';

@Component({
  selector: 'app-ratio-table',
  templateUrl: './ratio-table.component.html',
  styleUrl: './ratio-table.component.css',
  
})
export class RatioTableComponent {
	inputVal:object;
  updateInputVal(newValue: object) {
    this.inputVal = newValue; 
    console.log('Updated inputVal:', this.inputVal); 
  }
}
