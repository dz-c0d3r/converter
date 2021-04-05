import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of, timer } from 'rxjs';

import { ConverterApiActions, ConverterUiActions } from '../actions';
import { Store } from '@ngrx/store';
import * as fromReducer from '../reducers/converter.reducer';
import * as fromSelectors from '../selectors/converter.selectors';
import { ConverterApiService } from '../../services/converter-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GetCurrenciesRateSuccess } from '../converter.model';

@Injectable()
export class ConverterEffects {
  //#region converterApiGetRate$
  converterApiGetRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ConverterApiActions.getCurrenciesRateRequest,
        ConverterUiActions.setAmount,
        ConverterUiActions.switchCurrenciesRate
      ),
      withLatestFrom(
        this.store.select(fromSelectors.selectConverterApiPayload),
        this.store.select(fromSelectors.selectPollingInterval)
      ),
      switchMap(([_, params, pollingInterval]) =>
        timer(0, pollingInterval).pipe(
          mergeMap(() =>
            this.converterService.getCurrenciesRate(params).pipe(
              map((success: GetCurrenciesRateSuccess) =>
                ConverterApiActions.getCurrenciesRateSuccess({ success })
              ),
              catchError((response: HttpErrorResponse) =>
                of(
                  ConverterApiActions.getCurrenciesRateFailure({
                    failure: response,
                  })
                )
              )
            )
          )
        )
      )
    )
  );
  //#endregion

  constructor(
    private actions$: Actions,
    private store: Store<fromReducer.ConverterState>,
    private converterService: ConverterApiService
  ) {}
}
