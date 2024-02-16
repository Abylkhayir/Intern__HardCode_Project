import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
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
export class UsersComponent implements OnInit {
  @Input() inputVal: any;
  @Input() set toUpdate(value: boolean) {
    if (value) {
      this.updateList();
    }
  }

  color: string[] = [];
  fonarClick: boolean[] = [];
  newArr: User[] = [];
  checkFilter: boolean = false;
  get filteredArr(): User[] {
    return this.newArr.filter((item) => {
      console.log('inputVal: ', this.inputVal);
      if (this.inputVal == null) {
        return true;
      }
      const nameFilter = this.inputVal.employdId
        ? item.fullName
            .toLowerCase()
            .includes(this.inputVal.employdId.toLowerCase())
        : true;

      const stolFilter = this.inputVal.tableNumber
        ? item.tableNumber == this.inputVal.tableNumber
        : true;

      const mestoFilter = this.inputVal.placeNumber
        ? item.placeNumber == this.inputVal.placeNumber
        : true;

      const statusFilter =
        this.inputVal.radioStatus === 'undefined'
          ? true
          : item.radioStatus === (this.inputVal.radioStatus === 'true');

      if (this.inputVal.radioStatus) {
        return nameFilter && stolFilter && mestoFilter && statusFilter;
      }

      return nameFilter && stolFilter && mestoFilter;
    });
  }
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }, 100);
  }

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.userService.getData().subscribe((data: any) => {
      this.newArr = data?.result ?? [];
      this.scrollToBottom();
    });
  }

  onUpdateUser(index: number) {
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
