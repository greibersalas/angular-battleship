import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'game',
        loadChildren: () => import('./pages/game/game.module').then(module => module.GameModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./pages/setting/setting.module').then(module => module.SettingModule),
      },
      {
        path: 'statistics',
        loadChildren: () => import('./pages/statistics/statistics.module').then(module => module.StatisticsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
