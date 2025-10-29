import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'gestion', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/gestion/gestion.routes').then(m => m.GESTION_ROUTES)
      },
      {
        path: 'groups', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/groups/groups.routes').then(m => m.GROUPS_ROUTES)
      },
      {
        path: 'grading', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/grading/grading.routes').then(m => m.GRADING_ROUTES)
      },
      {
        path: 'consultation', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/consultation/consultation.routes').then(m => m.CONSULTATION_ROUTES)
      },
      {
        path: 'reports', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/report/report.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'configuration', // 👈 Nueva ruta
        loadChildren: () =>
          import('./features/configuration/configuration.routes').then(m => m.CONFIGURATION_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];