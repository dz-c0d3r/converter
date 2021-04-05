import { createAction, props, union } from '@ngrx/store';
import { CurrenciesCode, ExchangeHistory } from '../converter.model';

const actions = 'UI';
const source = 'Currencies-Converter';

export const addConvertionToHistory = createAction(
  `[${source}][${actions}] ADD_CONVERTION_TO_HISTORY`,
  props<{ params: ExchangeHistory }>()
);

export const setAmount = createAction(
  `[${source}][${actions}] SET_AMOUNT`,
  props<{ value: number }>()
);

export const setFromCurrency = createAction(
  `[${source}][${actions}] SET_FROM_CURRENCY`,
  props<{ value: CurrenciesCode }>()
);

export const setToCurrency = createAction(
  `[${source}][${actions}] SET_TO_CURRENCY`,
  props<{ value: CurrenciesCode }>()
);

export const setVariationRate = createAction(
  `[${source}][${actions}] SET_VARIATION_RATE`,
  props<{ value: number }>()
);

export const switchCurrenciesRate = createAction(
  `[${source}][${actions}] SWITCH_CURRENCIES_RATE`
);

const all = union({
  addConvertionToHistory,
  setAmount,
  setFromCurrency,
  setToCurrency,
  setVariationRate,
  switchCurrenciesRate,
});
export type ConverterUiActionsUnion = typeof all;
