import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { users } from "../users/data"


@Component({
	standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, FormsModule],
})
export class UsersComponent implements OnChanges{
  color:string[] = [];
  fonarClick:boolean[] = [];
  newArr = users;
  newArr2 = users;
  @Input() inputVal;
  constructor(){  
    for (let i = 0; i < this.newArr.length; i++){
      this.fonarClick[i] = false;
      if (i % 2 == 0){
        this.color[i] = '#222';
      }
      else{
        this.color[i] = 'rgba(34, 34, 34, 0.50)';
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("Users page: ", this.inputVal.inputStol);
    
    this.newArr = users
    .filter(item => item.name.toLowerCase().includes(this.inputVal.inputVal.toLowerCase()));  
  
  }
}
