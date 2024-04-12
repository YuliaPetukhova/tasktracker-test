import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'task/:id',
    loadComponent: () => import("./components/pages/task-page/task-page.component").then(m => m.TaskPageComponent),
  },
  {
    path: 'catalog',
    loadComponent: () => import("./components/pages/catalog/catalog.component").then(m => m.CatalogComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {
}
