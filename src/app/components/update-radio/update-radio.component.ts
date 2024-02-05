import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { users } from '../users/data';

@Component({
  standalone: true,
  selector: 'app-update-radio',
  templateUrl: './update-radio.component.html',
  styleUrl: './update-radio.component.scss',
  imports: [CommonModule ,FormsModule]
})
export class UpdateRadioComponent implements OnInit{
  selectedOption: string;
  currentRacia: User; 

  mine: Array<{ value: string; label: string }> = [ //  dropdown Рудник и его опций
    { value: 'Рудник Долинный', label: 'Рудник Долинный' },
    { value: 'Mine two', label: 'Mine two' },
  ];

  secured: Array<{ value: string; label: string }> = [ //  dropdown Закреплено и его опций
    { value: 'Бекмаганбетов Мухамбет Мырзабаевич', label: 'Бекмаганбетов Мухамбет Мырзабаевич' },
    { value: 'Didar Umirov', label: 'Didar Umirov' },
  ];

  options: Array<{ value: string; label: string; image: string }> = [ //  dropdown Статус и его опций
    {
      value: 'option1',
      label: 'Смена 1 (9:00-19:00)',
      image: '../../../assets/img/icon/lampoff',
    },
    {
      value: 'option2',
      label: 'Смена 2 (8:00-18:00)',
      image: '/assets/img/icon/lampoff.svg',
    },
  ];


  constructor(
    public dialogRef: MatDialogRef<UpdateRadioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Получаю данные с компонента юзер(который объект нужно изменить)
    ){
      this.currentRacia = this.data.userValue;
      console.log("Didar test: " ,this.currentRacia);
      this.currentRacia = {
        idRacia: this.data.userValue.id,
        rudnikName: this.mine[0].value,
        name: this.secured[0].value,
        idTaga: this.data.userValue.id_taga,
        idStol: this.data.userValue.id_stola,
        idMesto: this.data.userValue.id_mesto,
      };
    } 
  
  ngOnInit(): void {
  }  

  onSelectChange(event: Event){
    console.log((event.target as HTMLSelectElement).className);
    const className = (event.target as HTMLSelectElement).className;
    const selectedItem = (event.target as HTMLSelectElement).value;
    if (className == 'dropdown__mine'){
      this.currentRacia.rudnikName = selectedItem;
    }
    else if (className == 'dropdown__secured'){
      this.currentRacia.name = selectedItem;
    }
  }

  updateRacia(){
    console.log(this.currentRacia, users);
    users[this.data.userId].id = this.currentRacia.idRacia;
    users[this.data.userId].name = this.currentRacia.name;
    users[this.data.userId].id_mesto = this.currentRacia.idMesto;
    users[this.data.userId].id_stola = this.currentRacia.idStol;
    users[this.data.userId].id_taga = this.currentRacia.idTaga;
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}


interface User{
  idRacia: number;
  rudnikName: string;
  name: string;
  idTaga: number;
  idStol: number;
  idMesto: number;
}