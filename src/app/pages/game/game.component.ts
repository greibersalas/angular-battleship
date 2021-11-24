import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import Swal from'sweetalert2';

// Data
import { ShipDB } from '../../db/ship-data';
//Models
import { PositionModel, ShipModel, ShipsModel } from '../../models/ship.model';
import { TopsModel } from '../../models/tops.model';
import { TableModel } from '../../models/table.model';
//Services
import { ShipService } from '../../services/ship.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameState: number = 0;
  gameResult: string = '';
  error: boolean = false;
  message: string = '';
  messageDestroyed: any[] = [];
  nickName: string = '';
  shiftState: string = '';
  shifts: number = 0;
  shiftsUsed: number = 0;
  table: TableModel[] = [];
  tops: TopsModel[] = [];
  lefts: any[] = [];
  ship: ShipModel[] = ShipDB.ship;
  ships: ShipsModel[] = [
    {id: 1, ship: this.ship[0], positions: [], destroyed: false},
    {id: 2, ship: this.ship[1], positions: [], destroyed: false},
    {id: 3, ship: this.ship[1], positions: [], destroyed: false},
    {id: 4, ship: this.ship[2], positions: [], destroyed: false},
    {id: 5, ship: this.ship[2], positions: [], destroyed: false},
    {id: 6, ship: this.ship[2], positions: [], destroyed: false},
    {id: 7, ship: this.ship[3], positions: [], destroyed: false},
    {id: 8, ship: this.ship[3], positions: [], destroyed: false},
    {id: 9, ship: this.ship[3], positions: [], destroyed: false},
    {id: 10, ship: this.ship[3], positions: [], destroyed: false},
  ];
  constructor(
    private sihpService: ShipService
  ) { }

  ngOnInit(): void {
    this.getNickName();
    this.getShift();
  }

  getNickName(): void{
    this.nickName = this.sihpService.getNickName();
    if(this.nickName === null){
      this.nickName = `Guest${Math.floor(Math.random() * 10)}`;
      localStorage.setItem('nickName', this.nickName);
    }
  }

  getShift(): void{
    this.shiftState = this.sihpService.getShift();
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
      this.shifts = 10;
    }else{
      this.shifts = -1;
    }
    this.gameState = 1;
    this.setPositions();
  }

  /**
   * Funtion to reset the game
   */
  restartGame(opc: number = 1): void{
    if( opc == 2){
      this.shiftsUsed = 0;
      this.message = '';
      this.tops = [];
      this.table = [];
      this.lefts = [];
      this.gameState = 0;
      return;
    }
    Swal.fire({
      title: 'Do you want restart the Game?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `Not`,
    }).then((result) => {
      /* isConfirmed */
      if (result.isConfirmed) {
        this.sihpService.setFinishGame(this.ships,0,'Lose');
        this.shiftsUsed = 0;
        this.message = '';
        this.tops = [];
        this.table = [];
        this.lefts = [];
        this.gameState = 0;
      }
    });
  }

  setWinner(): void{
    const check = this.ships.filter( (el: ShipsModel) => { return el.destroyed });
    if( check.length > 0 ){
      this.gameState = 1;
      this.gameResult = 'Win';
      this.finishGame('Brillant... You Win');
    }
  }

  finishGame(message: string): void{
    Swal.fire({
      icon: 'info',
      title: message+' do you want to play again?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* isConfirmed */
      if (result.isConfirmed) {
        this.restartGame(2);
        this.sihpService.setFinishGame(this.ships,this.gameState,this.gameResult);
        this.tops = [];
        this.table = [];
        this.lefts = [];
        this.gameState = 0;
      }else{
        this.sihpService.setFinishGame(this.ships,this.gameState,this.gameResult);
      }
    });
  }

  /**
   * funtion to populate the table
   */
  getTable(): void{
    const config = this.sihpService.setTable();
    this.tops = config.tops;
    this.lefts = config.lefts;
    this.table = config.table;
  }

  getId(id: number): void{
    const find = this.table.find( i => {return i.id === id});
    if ( find.used ) { return; }
    this.shiftsUsed++;
    if(this.shiftsUsed === this.shifts){
      this.finishGame('The game is over!!');
      return;
    }
    find.used = true;
    if(this.checkHit(id+1) == 1){
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
        this.checkDestroyed(el);
      }
    });
    return hit;
  }

  checkDestroyed(el: ShipsModel): void{
    const { positions } = el;
    let hits: number = 0;
    positions.map( (pos: PositionModel) => {
      if(pos.state === 'hit'){
        hits++;
      }
    });
    if(hits === positions.length){
      el.destroyed = true;
      this.messageDestroyed.push({
        name: el.ship.name
      });
    }
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

  test(item: number): any{
    let find: any = {ship: {id: 0}};
    this.ships.map( el => {
      const post = _.filter(el.positions, (o: PositionModel) => { return o.id === item});
      if( post.length > 0){
        find = el;
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
    this.getTable();
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
        if(this.getPosition(start).length > 0){
          this.setRandon(ship);
          return;
        }
      }
    } else {
      const end = start + (10 * length);
      for (; start < end; start += 10) {
          if(this.getPosition(start).length > 0){
            this.setRandon(ship);
            return;
          }
      }
    }
    return false
  }

}
