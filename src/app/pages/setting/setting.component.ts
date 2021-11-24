import { Component, OnInit } from '@angular/core';

//Services
import { ShipService } from 'src/app/services/ship.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  nickName: string = '';
  shift: string = '';
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
    this.shift = this.sihpService.getShift();
  }

  save(): void {
    this.sihpService.saveSettings(this.nickName, this.shift);
  }

}
