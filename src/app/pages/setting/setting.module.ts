import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ComponentsModule,
    RouterModule
  ]
})
export class SettingModule { }
