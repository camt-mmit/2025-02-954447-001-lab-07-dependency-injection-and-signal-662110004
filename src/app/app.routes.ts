import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    redirectTo: 'example',
    pathMatch: 'full',
  },

  { path: 'example', loadChildren: () => import('./example/routes').then((m) => m.default) },

  { path: 'assignment', loadChildren: () => import('./assignment/routes').then((m) => m.default) },
];
