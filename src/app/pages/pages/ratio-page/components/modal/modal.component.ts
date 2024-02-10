import { Component, Inject } from '@angular/core';
import { secured, options } from '../users/data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RaciaService } from '../../services/racia.service';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ModalComponent{
  radioForm: FormGroup;
  mode: 'add' | 'update';
  newArr: User[] = [];
  secured = secured;
  options = options;
  submitted: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data: any,
    public service: RaciaService,
    ){      
      this.newArr = this.service.getRacia();
      if (data){
        this.mode = 'update';
      }
      else{
        this.mode = 'add';
      }
      
    } 
    
  ngOnInit(): void {
    this.radioForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      id_taga: ['', [Validators.required]],
      id_mesto: ['', [Validators.required]],
      id_stola: ['', [Validators.required]],
      status: ['', [Validators.required]],
      date: '22.04.2020 12:40 (116дн. 23ч.)',
      place: 'Ламповая старое АБК',
    })
        
    if (this.mode == 'update'){
      
      this.radioForm.patchValue({
        id: this.data.val.id,
        id_taga: this.data.val.id_taga,
        id_stola: this.data.val.id_stola,
        id_mesto: this.data.val.id_mesto,
        name: this.data.val.name,
        place: '22.04.2020 12:40 (116дн. 23ч.)',
        date: 'Ламповая старое АБК',
        status: this.data.val.status,
      })
    }
  }  


  onSubmit(){
    console.log(this.radioForm.value.status);
    
    this.submitted = true;
    if (!this.radioForm.valid){
      console.log("NO CHANGE");
      return;
    }
    if (this.mode === 'add'){
      console.log(this.radioForm.value, this.newArr[0]);
      
      this.newArr.push(this.radioForm.value);
      this.service.setRacia(this.newArr);
      this.dialogRef.close();
    }
    else{
      this.newArr[this.data.id] = this.radioForm.value;
      this.service.setRacia(this.newArr);
      this.dialogRef.close();
    }
  }


  closeDialog(){
    this.dialogRef.close();
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

