import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: `converter`,
    pathMatch: 'full',
  },
  {
    path: `converter`,
    loadChildren: () =>
      import('./pages/converter/converter.module').then(
        (m) => m.ConverterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
