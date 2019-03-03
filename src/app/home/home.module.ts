import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TsTrackerComponent } from '../ts-tracker/ts-tracker.component';
import { MenuComponent } from '../menu/menu.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskComponent } from '../task/task.component';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, TsTrackerComponent, MenuComponent, TaskListComponent, TaskComponent ]
})
export class HomePageModule {}
