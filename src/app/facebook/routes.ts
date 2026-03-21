import { Routes } from '@angular/router';
import { FbRoot } from './pages/fb-root/fb-root';

export default [
  {
    path: '',
    component: FbRoot,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
      },
      {
        path: 'posts',
        loadComponent: () => import('./pages/posts-page/posts-page').then((m) => m.PostsPage),
      },
      {
        path: 'likes',
        loadComponent: () => import('./pages/likes-page/likes-page').then((m) => m.LikesPage),
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/setting-page/setting-page').then((m) => m.SettingPage),
      },
    ],
  },
] as Routes;
