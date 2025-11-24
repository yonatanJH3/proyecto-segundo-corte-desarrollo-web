import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout';
import { AuthGuard, GuestGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        data: { title: 'Dashboard' }
      },
      {
        path: 'dashboard',
        data: { title: 'Dashboard' },
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'gestion',
        data: { title: 'Registro' },
        loadChildren: () =>
          import('./features/gestion/gestion.routes').then(m => m.GESTION_ROUTES)
      },
      {
        path: 'groups',
        data: { title: 'Grupos' },
        loadChildren: () =>
          import('./features/groups/groups.routes').then(m => m.GROUPS_ROUTES)
      },
      {
        path: 'grading',
        data: { title: 'Notas' },
        loadChildren: () =>
          import('./features/grading/grading.routes').then(m => m.GRADING_ROUTES)
      },
      {
        path: 'consultation',
        data: { title: 'Consultas' },
        loadChildren: () =>
          import('./features/consultation/consultation.routes').then(m => m.CONSULTATION_ROUTES)
      },
      {
        path: 'reports',
        data: { title: 'Reportes' },
        loadChildren: () =>
          import('./features/report/report.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'configuration',
        data: { title: 'Configuración' },
        loadChildren: () =>
          import('./features/configuration/configuration.routes').then(m => m.CONFIGURATION_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [GuestGuard],
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