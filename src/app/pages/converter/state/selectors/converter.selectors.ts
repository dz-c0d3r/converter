import { createSelector } from '@ngrx/store';
import * as fromConverter from '../reducers/converter.reducer';
import { QuotaInformation } from '../converter.model';

//#region Settings
export const selectConverterSettings = createSelector(
  fromConverter.getConverterState,
  ({ settings }) => settings
);
export const selectPollingInterval = createSelector(
  selectConverterSettings,
  ({ pollingInterval }) => pollingInterval
);
export const selectMaxExchangeHistoryRow = createSelector(
  selectConverterSettings,
  ({ maxExchangeHistoryRow }) => maxExchangeHistoryRow
);
export const selectMaxVariationRateValue = createSelector(
  selectConverterSettings,
  ({ maxVariationRateValue }) => maxVariationRateValue
);
export const selectMinVariationRateValue = createSelector(
  selectConverterSettings,
  ({ minVariationRateValue }) => minVariationRateValue
);
export const selectVariationRateStepValue = createSelector(
  selectConverterSettings,
  ({ variationRateStepValue }) => variationRateStepValue
);
//#endregion

//#region API
export const selectConverterApiResponse = createSelector(
  fromConverter.getConverterState,
  ({ api }) => api
);
export const selectLastUpdateDatetime = createSelector(
  selectConverterApiResponse,
  (api) => (api ? new Date(api?.timestamp) : undefined)
);
export const selectExchangeRateTooltipInformation = createSelector(
  selectConverterApiResponse,
  (api) =>
    api
      ? ({
          quota_used: api.quota_used,
          quota_remaining: api.quota_remaining,
          quota_limit: api.quota_limit,
          hours_until_reset: api.hours_until_reset,
        } as QuotaInformation)
      : undefined
);
//#endregion

//#region UI
export const selectConverterUi = createSelector(
  fromConverter.getConverterState,
  ({ ui }) => ui
);
export const selectAmount = createSelector(selectConverterUi, ({ amount }) =>
  amount ? amount.toFixed(2) : (1).toFixed(2)
);
export const selectFromCurrency = createSelector(
  selectConverterUi,
  ({ fromCurrency }) => fromCurrency
);
export const selectToCurrency = createSelector(
  selectConverterUi,
  ({ toCurrency }) => toCurrency
);
export const selectVariationRate = createSelector(
  selectConverterUi,
  ({ variationRate }) => variationRate
);
export const selectExchangeRate = createSelector(
  selectConverterUi,
  ({ exchangeRate }) => exchangeRate
);
export const selectExchangeRateWithVariation = createSelector(
  selectExchangeRate,
  selectVariationRate,
  selectMinVariationRateValue,
  selectMaxVariationRateValue,
  (exchangeRate, variationRate, min, max) =>
    variationRate === min
      ? exchangeRate
      : exchangeRate && variationRate <= max
      ? exchangeRate * variationRate
      : undefined
);
export const selectExchangeHistory = createSelector(
  selectConverterUi,
  ({ exchangeHistory }) => (exchangeHistory ? exchangeHistory : [])
);
export const selectFromCurrencyBaseExchangeRate = createSelector(
  selectConverterUi,
  ({ amount, exchangeRate }) =>
    exchangeRate ? (amount / amount) * (exchangeRate / amount) : undefined
);
export const selectToCurrencyBaseExchangeRate = createSelector(
  selectFromCurrencyBaseExchangeRate,
  (baseRate) => (baseRate ? 1 / baseRate : undefined)
);
//#endregion

//#region GLOBAL
export const selectConverterApiPayload = createSelector(
  selectConverterUi,
  ({ fromCurrency, toCurrency, amount }) => ({
    fromCurrency,
    toCurrency,
    amount,
  })
);
//#endregion
