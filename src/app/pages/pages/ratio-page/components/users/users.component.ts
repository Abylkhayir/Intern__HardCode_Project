import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user-service.service';
import { FilterComponent } from '../filter/filter.component';
import { ModalComponent } from '../modal/modal.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [CommonModule, FormsModule, FilterComponent, HttpClientModule],
})
export class UsersComponent implements OnInit, OnChanges {
  @Input() inputVal: any;

  color: string[] = [];
  fonarClick: boolean[] = [];
  newArr: User[] = [];
  checkFilter: boolean = false;
  filteredArr: User[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Value from Users:', this.inputVal);
    if (
      this.inputVal.inputName != '' ||
      this.inputVal.inputMesto != null ||
      this.inputVal.inputStol != null
    ) {
      this.checkFilter = true;
    } else {
      this.checkFilter = false;
    }
    this.filteredArr = this.newArr.filter((item) => {
      const nameFilter = this.inputVal.inputName
        ? item.fullName
            .toLowerCase()
            .includes(this.inputVal.inputName.toLowerCase())
        : true;
      const stolFilter = this.inputVal.inputStol
        ? item.tableNumber == this.inputVal.inputStol
        : true;
      const mestoFilter = this.inputVal.inputMesto
        ? item.placeNumber == this.inputVal.inputMesto
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
      if (i % 2 == 0) {
        this.color[i] = '#222';
      } else {
        this.color[i] = 'rgba(34, 34, 34, 0.50)';
      }
    }

    this.userService.getData().subscribe((data: any) => {
      this.newArr = data?.result ?? [];
    });
  }

  updateList(): void {
    this.userService.getData().subscribe((data: any) => {
      this.newArr = data?.result ?? [];
    });
  }

  onUpdateUser(index: number) {
    console.log(index, this.newArr[index]);
    this.dialog
      .open(ModalComponent, {
        data: {
          id: this.newArr[index].id,
          val: this.newArr[index],
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.updateList();
      });
  }

  onDeleteUser(user) {
    this.userService.deleteData(user.id).subscribe(() => {
      this.newArr = this.newArr.filter(
        (item) =>
          !(
            item.id == user.id &&
            item.fullName == user.fullName &&
            item.tagId == user.tagId
          )
      );
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
