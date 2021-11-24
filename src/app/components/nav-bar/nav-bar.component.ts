import { Component, OnInit } from '@angular/core';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faPlus = faPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
