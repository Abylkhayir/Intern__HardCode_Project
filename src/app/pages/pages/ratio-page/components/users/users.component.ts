import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../filter/filter.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { RaciaService } from '../../services/racia.service';
import { from, of, pipe } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { users } from './data';
import { map } from 'rxjs-compat/operator/map';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, FormsModule, FilterComponent, HttpClientModule],
})
export class UsersComponent implements OnInit,OnChanges {
  @Input() inputVal:any;
  
  color: string[] = []; // для бэкграунд цвета
  fonarClick: boolean[] = []; // определяет статус и меняет иконку
  newArr: User[] = []; // список юзеров
  checkFilter: boolean = false;
  filteredArr: User[] = [];

  constructor(
    public dialog: MatDialog, 
    public service: RaciaService,
    private http : HttpClient
    ) {
    this.service.newArr$.subscribe(users => {
      this.newArr = users;
    })
    console.log(this.newArr); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Value from Users:" ,this.inputVal);
    if (this.inputVal.inputName != '' || this.inputVal.inputMesto != null || this.inputVal.inputStol != null){
      this.checkFilter = true;
    }
    else{
      this.checkFilter = false;
    }
    this.filteredArr = this.newArr.filter((item) => { // Логика фильтрации
      const nameFilter = this.inputVal.inputName
        ? item.name
            .toLowerCase()
            .includes(this.inputVal.inputName.toLowerCase())
        : true;
      const stolFilter = this.inputVal.inputStol
        ? item.id_stola == this.inputVal.inputStol
        : true;
      const mestoFilter = this.inputVal.inputMesto
        ? item.id_mesto == this.inputVal.inputMesto
        : true;

      return nameFilter && stolFilter && mestoFilter;
    });
  }

  test = [1, 2, 3, 4];
  users$ = of(this.test);

  obs: any;

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.fonarClick[i] = false;
      if (i % 2 == 0) { // для бэкграунд фона
        this.color[i] = '#222';
      } else {
        this.color[i] = 'rgba(34, 34, 34, 0.50)';
      }
    }
    
  }

      
  onUpdateUser(id: number) {
    console.log(id, this.newArr[id]);
    this.dialog.open(ModalComponent, {
      data: {
        id: id, 
        val: this.newArr[id]
      }
    })
  }

  onDeleteUser(user){ // Удаление юзера
    this.newArr = this.newArr.filter(
      (item) => !(item.id == user.id && item.name == user.name && item.id_taga == user.id_taga)
    );
    this.service.setRacia(this.newArr);
  }
}

interface User {
  id: number;
  name: string;
  id_taga: number;
  id_stola: number;
  id_mesto: number;
  date: string;
  place: string;
}
