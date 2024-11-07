import { Routes } from '@angular/router';
import { PicturesGridComponent } from './pictures-grid/pictures-grid.component';

export const routes: Routes = [
  { path: '', component: PicturesGridComponent },
  { path: 'picture/:id', loadComponent: () => import('./picture-detail/picture-detail.component').then(m => m.PictureDetailComponent) },
];