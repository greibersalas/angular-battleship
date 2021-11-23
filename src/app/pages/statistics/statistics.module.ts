import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    RouterModule,
    ComponentsModule
  ]
})
export class StatisticsModule { }
