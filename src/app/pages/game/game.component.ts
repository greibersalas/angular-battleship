import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import Swal from'sweetalert2';

// Data
import { ShipDB } from '../../db/ship-data';
//Models
import { PositionModel, ShipModel, ShipsModel } from '../../models/ship.model';
//Services
import { ShipService } from '../../services/ship.service';
import { TopsModel } from '../../models/tops.model';
import { TableModel } from '../../models/table.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameState: number = 0;
  error: boolean = false;
  message: string = '';
  nickName: string = '';
  shiftState: string = '';
  shifts: number = 0;
  shiftsUsed: number = 0;
  table: TableModel[] = [];
  tops: TopsModel[] = [];
  lefts: any[] = [];
  ship: ShipModel[] = ShipDB.ship;
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
  ];
  constructor(
    private sihpService: ShipService
  ) { }

  ngOnInit(): void {
    this.getNickName();
    //this.setPositions();
  }

  getNickName(): void{
    this.nickName = this.sihpService.getNickName();
    if(this.nickName === null){
      this.nickName = `Guest${Math.floor(Math.random() * 10)}`;
      localStorage.setItem('nickName', this.nickName);
    }
  }

  /**
   * funtion to start the game
   */
  startGame(): void{
    if(this.shiftState === ''){
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'You must select a shifts!',
      })
      return;
    }
    if(this.shiftState === 'midium'){
      this.shifts = 100;
    }else if(this.shiftState === 'hard'){
      this.shifts = 50;
    }else{
      this.shifts = -1;
    }
    this.gameState = 1;
    this.setPositions();
  }

  /**
   * Funtion to reset the game
   */
  restartGame(): void{
    Swal.fire({
      title: 'Do you want restart the Game?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `Not`,
    }).then((result) => {
      /* isConfirmed */
      if (result.isConfirmed) {
        this.tops = [];
        this.table = [];
        this.lefts = [];
        this.gameState = 0;
      }
    });
  }

  /**
   * funtion to populate the table
   */
  setTable(): void{
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
  }

  getId(id: number): void{
    if(this.shifts === 0) return;
    this.shiftsUsed++;
    const find = this.table.find( i => {return i.id === id});
    find.used = true;
    if(this.checkHit(id-1) == 1){
      find.hit = true;
      this.message = 'ship was hit.';
    }else{
      find.miss = true;
      this.message = 'You missed!';
    }
  }

  /**
   * funtion to verify if the ship is hit
   * @param id
   * @returns
   */
  checkHit(id: number): number{
    let hit: number = 0;
    this.ships.map( el => {
      const post = _.filter(el.positions, (o: PositionModel) => { return o.id === id});
      if( post.length > 0){
        post[0].state = 'hit';
        hit = 1;
      }
    });
    return hit;
  }

  checkPosition(i: number) : number{
    const post = this.getPosition(i);
    if(post.length > 0){
      return post[0].ship.id;
    }
    return 0;
  }
  /**
   * Función para buscar una posición
   * @param i
   * @returns
   */
  getPosition(item: number): any{
    let find = [];
    this.ships.map( el => {
      const post = _.filter(el.positions, (o: PositionModel) => { return o.id === item});
      if( post.length > 0){
        find[0] = el;
        return;
      }
    });
    return find;
  }

  /**
   * Funcion para crear la estructura de los barcos
   */
  setPositions(): void{
    this.ships.forEach( (el) => {
      el.positions = [];
      this.setRandon(el);
    });
    this.setTable();
  }

  async setRandon(ship: ShipsModel): Promise<void>{
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
  }

  checkOverlap(rand: number, orientation: string, length: number, ship: ShipsModel): boolean{
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
  }

}
