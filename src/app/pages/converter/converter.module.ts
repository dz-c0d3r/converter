import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './container/converter.component';
import { SelectComponent } from './presentational/select/select.component';
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [ConverterComponent, SelectComponent],
  imports: [CommonModule, ConverterRoutingModule, MatSliderModule],
  exports: [ConverterComponent, SelectComponent],
})
export class ConverterModule {}
