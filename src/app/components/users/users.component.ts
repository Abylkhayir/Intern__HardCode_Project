import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { users } from '../users/data';
import { AddRadioComponent } from '../add-radio/add-radio.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, FormsModule, AddRadioComponent, FilterComponent],
})
export class UsersComponent implements OnChanges {
  color: string[] = [];
  fonarClick: boolean[] = [];
  newArr: User[] = [];
  @Input() inputVal;

  constructor(private service: ServiceService) {
    this.newArr = users;
    for (let i = 0; i < this.newArr.length; i++) {
      this.fonarClick[i] = false;
      if (i % 2 == 0) {
        this.color[i] = '#222';
      } else {
        this.color[i] = 'rgba(34, 34, 34, 0.50)';
      }
    }
  }

  onUpdateUser(id: number) {
    console.log(id, this.newArr[id]);
  }

  onDeleteUser(user) {
    this.newArr = this.newArr.filter(
      (item) =>
        !(
          item.id == user.id &&
          item.name == user.name &&
          item.id_taga == user.id_taga
        )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log();
    this.newArr = users.filter((item) => {
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
