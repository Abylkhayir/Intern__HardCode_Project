import { Component, Inject } from '@angular/core';
import { secured, options } from '../users/data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
      id: '',
      name: '',
      id_taga: '',
      id_mesto: '',
      id_stola: '',
      date: 'date',
      place: 'place',
    })

    if (this.mode == 'update'){
      this.radioForm.patchValue({
        id: this.data.val.id,
        id_taga: this.data.val.id_taga,
        id_stola: this.data.val.id_stola,
        id_mesto: this.data.val.id_mesto,
        name: this.data.val.name,
        place: 'place',
        date: 'date',
      })
    }
  }  


  onSubmit(){

    if (this.mode === 'add'){
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

