import { AbstractControl, ValidatorFn } from '@angular/forms';


export function CyrillicValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const hasCyrillic = /[а-яА-Я]/.test(value); 
    return hasCyrillic ? { 'cyrillic': true } : null;
  };
}
