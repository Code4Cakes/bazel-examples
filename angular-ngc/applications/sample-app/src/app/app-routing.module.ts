import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({ selector: 'empty', template: '' })
export class EmptyComponent {}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module.ngfactory').then(
        m => m.DashboardModuleNgFactory
      ),
  },
  {
    path: 'redux',
    loadChildren: () =>
      import('./todo/todo.module.ngfactory').then(m => m.TodoModuleNgFactory),
  },
  {
    path: 'hybrid',
    loadChildren: () =>
      import('./home/home.module.ngfactory').then(m => m.HomeModuleNgFactory),
  },
  { path: '**', component: EmptyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [EmptyComponent],
})
export class AppRoutingModule {}
