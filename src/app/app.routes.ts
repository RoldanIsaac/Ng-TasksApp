import { Routes } from '@angular/router';
import { BasicLayoutComponent } from './layout/layouts/basic-layout/basic-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/auth',
  },
  {
    path: 'app/auth',
    component: LoginComponent,
  },
  {
    path: 'app/home',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: BasicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/modules.routes').then((m) => m.routes),
      },
    ],
  },
];
