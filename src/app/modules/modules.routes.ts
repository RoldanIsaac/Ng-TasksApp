import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/home',
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('./../../app/modules/tasks/tasks.routes').then(
            (m) => m.routes
          ),
      },
    ],
  },
];
