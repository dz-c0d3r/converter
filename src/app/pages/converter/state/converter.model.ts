export interface GetCurrenciesRateRequest {
  fromCurrency?: string;
  toCurrency?: string;
  amount?: number;
}

export interface GetCurrenciesRateSuccess {
  amount: number;
  hours_until_reset: number;
  quota_limit: number;
  quota_remaining: number;
  quota_used: number;
  text: string;
  timestamp: number;
  value: string;
}

export interface ExchangeHistory {
  fromCurrencyCode: CurrenciesCode;
  fromCurrencyAmount: number;
  toCurrencyCode: CurrenciesCode;
  toCurrencyRate: number;
  variationRate: number;
  toCurrencyRateWithVariation: number;
}

export enum CurrenciesCodeEnum {
  EURO = 'EUR',
  US_DOLLAR = 'USD',
}

export enum CurrenciesLabelEnum {
  EURO = 'Euro',
  US_DOLLAR = 'Dollar des États-Unis',
}

export enum CurrenciesSymbolEnum {
  EURO = '€',
  US_DOLLAR = '$',
}

export type CurrenciesCode = 'EUR' | 'USD';

export interface QuotaInformation {
  quota_used: number;
  quota_remaining: number;
  quota_limit: number;
  hours_until_reset: number;
}
