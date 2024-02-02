import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
	toolBarOptionsBackground:string[] = [];
  toolBarOptionsBorderBottom:string[] = [];
  previousVal:string = 'ratio';
  constructor(){
    this.toolBarOptionsBackground[this.previousVal] = "#333";
    this.toolBarOptionsBorderBottom[this.previousVal] = "3px solid #CCCCCC";
  }
  onSelect(e){
    this.toolBarOptionsBackground[e] = '#333';
    this.toolBarOptionsBorderBottom[e] = '3px solid #CCCCCC';
    this.toolBarOptionsBackground[this.previousVal] = '#222222';
    this.toolBarOptionsBorderBottom[this.previousVal] = "none";
    this.previousVal = e;
  }
}
