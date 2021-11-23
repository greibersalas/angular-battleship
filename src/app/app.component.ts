import { Component, OnInit } from '@angular/core';
//import * as _ from 'lodash';

//Models
//import { PositionModel, ShipModel, ShipsModel } from './models/ship.model';
//Services
//import { ShipService } from './services/ship.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-battleship';
  /*message: string = '';
  shifts: number = 10;
  table: any[] = [];
  tops: any[] = [];
  lefts: any[] = [];
  ship: ShipModel[] = [
    {id: 1, name: 'Carrier', size: 4},
    {id: 2, name: 'Cruiser', size: 3},
    {id: 3, name: 'Destroyer', size: 2},
    {id: 4, name: 'Frigate', size: 1}
  ];
  ships: ShipsModel[] = [
    {id: 1, ship: this.ship[0], positions: []},
    {id: 2, ship: this.ship[1], positions: []},
    {id: 3, ship: this.ship[1], positions: []},
    {id: 4, ship: this.ship[2], positions: []},
    {id: 5, ship: this.ship[2], positions: []},
    {id: 6, ship: this.ship[2], positions: []},
    {id: 7, ship: this.ship[3], positions: []},
    {id: 8, ship: this.ship[3], positions: []},
    {id: 9, ship: this.ship[3], positions: []},
    {id: 10, ship: this.ship[3], positions: []},
  ];*/
  constructor(
    //private sihpService: ShipService
  ) { }

  ngOnInit(): void {
    //this.setPositions();
  }

  /*setTable(): void{
    for (let i = 1; i <= 100; i++) {
      if( i < 11) {
        this.tops.unshift({
          id: i,
          name: Math.abs(i - 11),
          class: 'aTops'
        });
        this.table.push({
          id: i,
          name: i,
          style: 'points offset1 '+i,
          used: false,
          miss: false,
          hit: false,
          ship: 0
        });
      } else {
        this.table.push({
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
        this.tops.unshift({
          id: i,
          name: Math.abs(i - 11),
          class: 'aTops hidezero'
        });
      }
      if( i > 90){
        this.lefts.push({
          id: i,
          name: String.fromCharCode(97 + (i - 91)).toUpperCase(),
          class: 'aLeft'
        });
      }
    }
  }*/

  /*getId(id: number): void{
    if(this.shifts === 0) return;
    this.shifts--;
    console.log(this.table);
    console.log(this.table[0].miss);
    const find = this.table.find( i => {return i.id === id});
    //console.log({find});
    find.used = true;
    console.log({id});
    if(this.checkHit(id-1) == 1){
      find.hit = true;
      this.message = 'ship was hit.';
    }else{
      find.miss = true;
      this.message = 'You missed!';
    }
  }*/

  /*checkHit(id: number): number{
    let hit: number = 0;
    this.ships.map( el => {
      const post = _.filter(el.positions, (o: PositionModel) => { return o.id === id});
      if( post.length > 0){
        post[0].state = 'hit';
        hit = 1;
      }
    });
    return hit;
  }*/

  /*checkPosition(i: number) : number{
    let check = {ship: 0};
    const post = this.getPosition(i);
    if(post.length > 0){
      return post[0].ship.id;
    }
    return 0;
  }*/
  /**
   * Función para buscar una posición
   * @param i
   * @returns
   */
  /*getPosition(item: number): any{
    //console.log({item});
    let find = [];
    this.ships.map( el => {
      const post = _.filter(el.positions, (o: PositionModel) => { return o.id === item});
      if( post.length > 0){
        find[0] = el;
        return;
      }
    });
    return find;
  }*/

  /**
   * Funcion para crear la estructura de los barcos
   */
  /*setPositions(): void{
    //this.setRandon(this.ships[0]);
    this.ships.forEach( (el) => {
    });
    this.setTable();
  }*/

  /*async setRandon(ship: ShipsModel): Promise<void>{
    const origin = Math.floor((Math.random() * 10) + 1);
    const length = ship.ship.size;
    if( origin < 6 ) {
      const offset = 11 - length;
      const horizontal = Math.floor((Math.random() * offset) + 1);
      const vertial = Math.floor(Math.random() * 9);
      const rand = Number(String(vertial)+String(horizontal));
      if ( !this.checkOverlap(rand, 'H', length, ship) ) {
        ship.positions = await this.sihpService.setPopulateHorzontal(rand, ship.ship.size);
      }
    }else{
      const offset = 110 - (length * 10);
      const rand = Math.floor((Math.random() * offset) + 1);
      if ( !this.checkOverlap(rand, 'V', length, ship) ) {
        ship.positions = await this.sihpService.setPopulateVertical(rand, ship.ship.size);
      }
    }
  }*/

  /*checkOverlap(rand: number, orientation: string, length: number, ship: ShipsModel): boolean{
    let start = rand;
    if ( orientation === 'H') {
      const end = rand + length;
      for (; start < end; start++) {
        for ( let i = 0; i < ship.ship.size; i++) {
          if(this.getPosition(i).length > 0){
            this.setRandon(ship);
            return;
          }
        }
      }
    } else {
      const end = start + (10 * length);
      for (; start < end; start += 10) {
        for ( let i = 0; i < ship.ship.size; i++) {
          if(this.getPosition(i).length > 0){
            this.setRandon(ship);
            return;
          }
        }
      }
    }
    return false
  }*/

}
