import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaskPageComponent } from './components/pages/task-page/task-page.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';

export const routes: Routes = [
  { path: 'task/:id', component: TaskPageComponent },
  { path: 'catalog', component: CatalogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}

