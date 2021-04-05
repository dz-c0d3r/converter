import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConverter from './state/reducers/converter.reducer';
import { ConverterEffects } from './state/effects/converter.effects';
import { initialState } from './state/reducers/converter.reducer';
import { ConverterApiService } from './services/converter-api.service';
import { ConverterComponent } from './container/converter.component';
import { SelectComponent } from './presentational/select/select.component';

@NgModule({
  declarations: [ConverterComponent, SelectComponent],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    MatSliderModule,
    StoreModule.forFeature(
      fromConverter.converterFeatureKey,
      fromConverter.reducer,
      { initialState: initialState }
    ),
    EffectsModule.forFeature([ConverterEffects]),
  ],
  providers: [ConverterApiService],
  exports: [ConverterComponent, SelectComponent],
})
export class ConverterModule {}
