import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ConverterApiActions, ConverterUiActions } from '../actions';
import {
  CurrenciesCode,
  CurrenciesCodeEnum,
  ExchangeHistory,
  GetCurrenciesRateSuccess,
} from '../converter.model';

export const converterFeatureKey = 'converter';

export interface ConverterState {
  settings: {
    maxExchangeHistoryRow: number;
    maxVariationRateValue: number;
    minVariationRateValue: number;
    pollingInterval: number;
    variationRateStepValue: number;
  };
  api: GetCurrenciesRateSuccess | undefined;
  ui: {
    amount: number;
    fromCurrency: CurrenciesCode;
    toCurrency: CurrenciesCode;
    exchangeRate: number | undefined;
    variationRate: number;
    exchangeHistory: ExchangeHistory[];
  };
}

export const initialState: ConverterState = {
  settings: {
    maxExchangeHistoryRow: 5,
    maxVariationRateValue: 2,
    minVariationRateValue: 1,
    pollingInterval: 3 * 1000,
    variationRateStepValue: 0.01,
  },
  api: undefined,
  ui: {
    amount: 1,
    fromCurrency: CurrenciesCodeEnum.EURO,
    toCurrency: CurrenciesCodeEnum.US_DOLLAR,
    exchangeRate: undefined,
    variationRate: 1,
    exchangeHistory: [],
  },
};

export const reducer = createReducer(
  initialState,
  on(
    ConverterApiActions.getCurrenciesRateSuccess,
    (state, { success }): ConverterState => ({
      ...state,
      api: success,
      ui: {
        ...state.ui,
        exchangeRate: parseFloat(success.value),
      },
    })
  ),
  on(
    ConverterUiActions.setAmount,
    (state, { value }): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        amount: value,
      },
    })
  ),
  on(
    ConverterUiActions.setFromCurrency,
    (state, { value }): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        fromCurrency: value,
      },
    })
  ),
  on(
    ConverterUiActions.setToCurrency,
    (state, { value }): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        toCurrency: value,
      },
    })
  ),
  on(
    ConverterUiActions.switchCurrenciesRate,
    (state): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        fromCurrency: state.ui.toCurrency,
        toCurrency: state.ui.fromCurrency,
      },
    })
  ),
  on(
    ConverterUiActions.setVariationRate,
    (state, { value }): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        variationRate: value,
      },
    })
  ),
  on(
    ConverterUiActions.addConvertionToHistory,
    (state, { params }): ConverterState => ({
      ...state,
      ui: {
        ...state.ui,
        exchangeHistory:
          state.ui.exchangeHistory.length < state.settings.maxExchangeHistoryRow
            ? state.ui.exchangeHistory.concat(params)
            : state.ui.exchangeHistory.slice(1).concat(params),
      },
    })
  )
);

export const getConverterState = createFeatureSelector<ConverterState>(
  converterFeatureKey
);
