import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConverterResolverService } from './services/converter.resolver.service';
import { ConverterComponent } from './container/converter.component';

const routes: Routes = [
  {
    path: '',
    resolve: { converter: ConverterResolverService },
    component: ConverterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ConverterResolverService],
})
export class ConverterRoutingModule {}
