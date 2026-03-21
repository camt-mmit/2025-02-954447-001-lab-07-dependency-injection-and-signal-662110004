import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./facebook/routes').then((m) => m.default),
  },
];
