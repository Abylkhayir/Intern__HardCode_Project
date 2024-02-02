import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { users } from '../users/data';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-add-radio',
  templateUrl: './add-radio.component.html',
  styleUrl: './add-radio.component.scss',
  imports: [CommonModule, FormsModule, MatButtonModule],
})
export class AddRadioComponent {
  selectedOption: string;
  racia: User;
  constructor(public dialogRef: MatDialogRef<AddRadioComponent>) {
    this.selectedOption = this.options[0].value;
    this.racia = {
      idRacia: undefined,
      rudnikName: '',
      name: '',
      idTaga: undefined,
      idStol: undefined,
      idMesto: undefined,
    };
  }

  mine: Array<{ value: string; label: string }> = [
    { value: 'mine1', label: 'Рудник Долинный' },
    { value: 'mine2', label: 'Mine two' },
  ];

  secured: Array<{ value: string; label: string }> = [
    { value: 'secured1', label: 'Бекмаганбетов Мухамбет Мырзабаевич' },
    { value: 'secured2', label: 'secured two' },
  ];

  options: Array<{ value: string; label: string; image: string }> = [
    {
      value: 'option1',
      label: 'Смена 1 (9:00-19:00)',
      image: '/assets/img/icon/lampon.svg',
    },
    {
      value: 'option2',
      label: 'Смена 2 (8:00-18:00)',
      image: '/assets/img/icon/lampoff.svg',
    },
  ];

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = JSON.parse(selectElement.value);
  }

  getValue() {
    console.log(this.racia);
  }

  addRacia() {
    users.push({
      id: this.racia.idRacia,
      name: this.racia.name,
      id_taga: this.racia.idTaga,
      id_stola: this.racia.idStol,
      id_mesto: this.racia.idMesto,
      date: null,
      place: null,
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
