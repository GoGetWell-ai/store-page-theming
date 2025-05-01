import authRoute from './authRoute';
import type { Routes } from '@/@types/routes';
import Home from '@/views/Home';
import Themes from '@/views/Home/themes';

export const publicRoutes: Routes = [
  { key: 'home', path: '/', component: Home },
  { key: 'themes', path: '/themes', component: Themes },
  ...authRoute,
];

export const protectedRoutes: Routes = [];