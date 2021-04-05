import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ConverterApiActions } from '../state/actions';
import * as fromRoute from '../state/reducers/converter.reducer';

@Injectable({
  providedIn: 'root',
})
export class ConverterResolverService implements Resolve<void> {
  constructor(private store: Store<fromRoute.ConverterState>) {}

  resolve(): void {
    this.store.dispatch(
      ConverterApiActions.getCurrenciesRateRequest({ params: {} })
    );
  }
}
