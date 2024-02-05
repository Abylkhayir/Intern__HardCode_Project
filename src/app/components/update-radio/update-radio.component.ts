import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-update-radio',
  templateUrl: './update-radio.component.html',
  styleUrl: './update-radio.component.scss',
  imports: [FormsModule]
})
export class UpdateRadioComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<UpdateRadioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Получаю данные с компонента юзер(который объект нужно изменить)
    ){} 

  ngOnInit(): void {
    console.log(this.data);
    
  }  

  onSelectChange(event: Event){

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
