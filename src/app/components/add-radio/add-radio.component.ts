import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { users } from '../users/data';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  standalone: true,
  selector: 'app-add-radio',
  templateUrl: './add-radio.component.html',
  styleUrl: './add-radio.component.scss',
  imports: [CommonModule, FormsModule, MatButtonModule],
})
export class AddRadioComponent {
  selectedOption: string; // Опция для статуса
  racia: User; // Объект, который будет хранить данные в полях
  constructor(public dialogRef: MatDialogRef<AddRadioComponent>) {
    // тут я приписываю изначальные значения 
    this.selectedOption = this.options[0].value;
    this.racia = {
      idRacia: undefined,
      rudnikName: this.mine[0].value,
      name: this.secured[0].value,
      idTaga: undefined,
      idStol: undefined,
      idMesto: undefined,
    };
  }

  mine: Array<{ value: string; label: string }> = [ //  dropdown Рудник и его опций
    { value: 'Рудник Долинный', label: 'Рудник Долинный' },
    { value: 'Mine two', label: 'Mine two' },
  ];

  secured: Array<{ value: string; label: string }> = [ //  dropdown Закреплено и его опций
    { value: 'secured1', label: 'Бекмаганбетов Мухамбет Мырзабаевич' },
    { value: 'secured2', label: 'secured two' },
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

  onSelectChange(event: Event): void {   // Выборка с dropdown для Рудника и Закреплено
    console.log((event.target as HTMLSelectElement).className);
    const className = (event.target as HTMLSelectElement).className;
    const selectedItem = (event.target as HTMLSelectElement).value;
    if (className == 'dropdown__mine'){
      this.racia.rudnikName = selectedItem;
    }
    else if (className == 'dropdown__secured'){
      this.racia.name = selectedItem;
    }
  }


  addRacia() { // Добавление новой рации
    console.log(this.racia, users);
    
    users.push({
      id: this.racia.idRacia,
      name: this.racia.name,
      id_taga: this.racia.idTaga,
      id_stola: this.racia.idStol,
      id_mesto: this.racia.idMesto,
      date: '22.04.2020 12:40 (116дн. 23ч.)',
      place: 'Ламповая старое АБК',
    });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

interface User {
  idRacia: number;
  rudnikName: string;
  name: string;
  idTaga: number;
  idStol: number;
  idMesto: number;
}
