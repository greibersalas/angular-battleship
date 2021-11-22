import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { GameComponent } from './game.component';


@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    ComponentsModule
  ]
})
export class GameModule { }
