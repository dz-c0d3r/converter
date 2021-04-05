import { createAction, props, union } from '@ngrx/store';

import {
  GetCurrenciesRateRequest,
  GetCurrenciesRateSuccess,
} from '../converter.model';
import { HttpErrorResponse } from '@angular/common/http';

const actions = 'API';
const source = 'Currencies-Converter';

export const getCurrenciesRateRequest = createAction(
  `[${source}][${actions}] GET_CURRENCIES_RATE_REQUEST`,
  props<{ params: GetCurrenciesRateRequest }>()
);
export const getCurrenciesRateSuccess = createAction(
  `[${source}][${actions}] GET_CURRENCIES_RATE_SUCCESS`,
  props<{ success: GetCurrenciesRateSuccess }>()
);
export const getCurrenciesRateFailure = createAction(
  `[${source}][${actions}] GET_CURRENCIES_RATE_FAILURE`,
  props<{ failure: HttpErrorResponse }>()
);

const all = union({
  getCurrenciesRateRequest,
  getCurrenciesRateSuccess,
  getCurrenciesRateFailure,
});
export type ConverterApiActionsUnion = typeof all;
