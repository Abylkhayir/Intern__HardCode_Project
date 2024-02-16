import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user-service.service';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl:'./modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModalComponent {
  radioForm: FormGroup;
  mode: 'add' | 'update';
  newArr: Radio[] = [];
  securedList: { value: number; label: string }[] = [];
  options: Array<{ value: boolean; label: string }> = [
    { value: true, label: 'Включен' },
    { value: false, label: 'Выключен' },
  ];
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {
    this.newArr = [];
    if (data) {
      this.mode = 'update';
    } else {
      this.mode = 'add';
    }
  }

  ngOnInit(): void {
    if (this.mode === 'update') {
      this.radioForm = this.formBuilder.group({
        id: [this.data.val.id],
        radioNumber: [this.data.val.radioNumber, [Validators.required]],
        employeeId: [this.data.val.employeeId, [Validators.required]],
        tagId: [this.data.val.tagId, [Validators.required]],
        placeNumber: [this.data.val.placeNumber, [Validators.required]],
        tableNumber: [this.data.val.tableNumber, [Validators.required]],
        radioStatus: [this.data.val.radioStatus, [Validators.required]],
      });
    } else {
      this.radioForm = this.formBuilder.group({
        radioNumber: ['', [Validators.required]],
        employeeId: ['', [Validators.required]],
        tagId: ['', [Validators.required]],
        placeNumber: ['', [Validators.required]],
        tableNumber: ['', [Validators.required]],
        radioStatus: ['', [Validators.required]],
      });
    }

    this.userService.getEmployees().subscribe(
      (response) => {
        this.securedList = (response?.result ?? []).map((employee) => ({
          value: employee.id,
          label: employee.fullName,
        }));
        console.log('asad: ', this.securedList);
      },
      (error) => {
        console.error('Failed to fetch employees', error);
        // Handle error
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (!this.radioForm.valid) {
      console.log('NO CHANGE');
      return;
    }
    if (this.mode === 'add') {
      const data: Radio = this.radioForm.value;
      data.employeeId = +data.employeeId;
      data.radioStatus = this.radioForm.value.radioStatus === 'true';
            this.userService.addData(this.radioForm.value).subscribe(
        (response) => {
          console.log('Data added successfully', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Failed to add data', error);
          // Handle error
        }
      );
    } else {
      const data: Radio = this.radioForm.value;
      data.employeeId = +data.employeeId;
      data.radioStatus = this.radioForm.value.radioStatus === 'true';
      console.log('asdasd: ', data);
      this.userService.editData(this.radioForm.value).subscribe(
        (response) => {
          console.log('Data updated successfully', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Failed to update data', error);
          // Handle error
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}

interface Radio {
  id: number;
  fullName: string;
  tagId: number;
  lastRegistry: string;
  tableNumber: number;
  placeNumber: number;
  placeOfLastSynchronization: string;
  radioStatus: boolean;
  radioNumber: number;
  employeeId: number;
}
