import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  public formatDate(date?: Date): string {
    if (!date) return '';

    const day = this.formatToTwoCharactersNumber(date.getDate());
    const month = this.formatToTwoCharactersNumber(date.getMonth() + 1);

    return `${day}/${month}/${date.getFullYear()}`;
  }

  public formatTime(date?: Date): string {
    if (!date) return '';

    const hour = this.formatToTwoCharactersNumber(date.getHours());
    const minute = this.formatToTwoCharactersNumber(date.getMinutes());

    return `${hour}:${minute}`;
  }

  private formatToTwoCharactersNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
}
