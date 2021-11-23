import { Injectable } from '@angular/core';
import { PositionModel } from '../models/ship.model';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor() { }

  async setPopulateHorzontal(start: number, length: number): Promise<PositionModel[]> {
    const ship: PositionModel[] = [];
    for (let i = 0; i < length; i++, start++) {
      ship.push({id: start, state: 'empty'});
    }
    return ship;
  }

  async setPopulateVertical(start: number, length: number): Promise<PositionModel[]> {
    const ship: PositionModel[] = [];
    for (let i = 0; i < length; i++, start += 10) {
      ship.push({id: start, state: 'empty'});
    }
    return ship;
  }

  getNickName(): string {
    return localStorage.getItem('nickname');
  }
}
