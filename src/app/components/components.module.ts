import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [NavBarComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavBarComponent]
})
export class ComponentsModule { }
