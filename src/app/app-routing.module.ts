import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tarea',
    loadChildren: () =>
      import('./tarea/tarea.module').then((m) => m.TareaPageModule),
  },
  {
    path: 'detalle-tarea/:id',
    loadChildren: () =>
      import('./detalle-tarea/detalle-tarea.module').then(
        (m) => m.DetalleTareaPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
