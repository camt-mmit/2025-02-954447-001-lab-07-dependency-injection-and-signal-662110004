import { Routes } from '@angular/router';
import { AssignmentRoot } from './pages/assg-root/assg-root';
import { AssignmentDisplayPage } from './pages/assg-display-page/assg-display-page';

export default [
  {
    path: '',
    component: AssignmentRoot,
    children: [
      { path: '', redirectTo: 'display', pathMatch: 'full' },

      { path: 'display', component: AssignmentDisplayPage },
    ],
  },
] as Routes;
