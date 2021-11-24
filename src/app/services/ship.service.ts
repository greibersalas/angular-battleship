import { Injectable } from '@angular/core';
import { PositionModel, ShipsModel } from '../models/ship.model';

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
    return localStorage.getItem('nickName');
  }

  async setFinishGame(ships: ShipsModel[], state: number, result: string): Promise<void> {
    let games = await this.getGames();
    console.log({games});
    const game = {
      nickName: this.getNickName(),
      ships: ships,
      date: new Date(),
      state,
      result
    };
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));
  }

  async getGames(): Promise<any> {
    let games = localStorage.getItem('games');
    if( games === null ) {
      return [];
    }
    return JSON.parse(games);
  }

  saveSettings(nickName: string, shift: string): void {
    localStorage.setItem('nickName', nickName);
    localStorage.setItem('shift', shift);
  }

  getShift(): string {
    return localStorage.getItem('shift');
  }

  setTable(): any{
    let config = {
      tops: [],
      table: [],
      lefts: []
    };
    for (let i = 1; i <= 100; i++) {
      if( i < 11) {
        config.tops.unshift({
          id: i,
          name: Math.abs(i - 11),
          class: 'aTops'
        });
        config.table.push({
          id: i,
          name: i,
          style: 'points offset1 '+i,
          used: false,
          miss: false,
          hit: false,
          ship: 0
        });
      } else {
        config.table.push({
          id: i,
          name: i,
          style: 'points offset2 '+i,
          used: false,
          miss: false,
          hit: false,
          ship: 0
        });
      }
      if( i === 11) {
        config.tops.unshift({
          id: i,
          name: Math.abs(i - 11),
          class: 'aTops hidezero'
        });
      }
      if( i > 90){
        config.lefts.push({
          id: i,
          name: String.fromCharCode(97 + (i - 91)).toUpperCase(),
          class: 'aLeft'
        });
      }
    }
    return config;
  }
}
