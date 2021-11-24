import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//Services
import { ShipService } from '../../services/ship.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  faPlus = faPlus;
  title: string = 'Game Statistics';
  listGames: any[] = [];
  nickName: string = '';
  data: any;
  constructor(
    private sihpService: ShipService
  ) { }

  ngOnInit(): void {
    this.getNickName();
    this.getGames();
  }

  getNickName(): void{
    this.nickName = this.sihpService.getNickName();
    if(this.nickName === null){
      this.nickName = `Guest${Math.floor(Math.random() * 10)}`;
      localStorage.setItem('nickName', this.nickName);
    }
  }

  async getGames(): Promise<void> {
    const games = await this.sihpService.getGames();
    this.listGames = games;
    this.setData(games);
  }

  setData(data: any): void {
    const wins = data.filter((game: any) => game.result === 'Win');
    const lose = data.filter((game: any) => game.result === 'Lose');
    const completed = data.filter((game: any) => game.state === 1);
    const incompleted = data.filter((game: any) => game.state === 0);
    this.data = {
      wins: wins.length,
      lose: lose.length,
      completed: completed.length,
      incompleted: incompleted.length
    };
  }

}
