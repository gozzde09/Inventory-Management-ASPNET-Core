import { Routes } from '@angular/router';
import { Items } from './pages/items/item-list';
import { Overview } from './pages/items/overview/overview';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: Overview },
  { path: 'items', component: Items },
];
