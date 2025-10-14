import { Routes } from '@angular/router';
import { TasksComponent } from './views/tasks/tasks.component';
import { TasksDetailsComponent } from './views/tasks-details/tasks-details.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'details/:id',
    component: TasksDetailsComponent,
  },
];
