import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { GameComponent } from './game.component';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule
  ]
})
export class GameModule { }
