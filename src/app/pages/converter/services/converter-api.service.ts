import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetCurrenciesRateRequest,
  GetCurrenciesRateSuccess,
} from '../state/converter.model';
import { environment } from '../../../../environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConverterApiService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param paramsRequest
   */
  getCurrenciesRate({
    amount,
    fromCurrency,
    toCurrency,
  }: GetCurrenciesRateRequest): Observable<GetCurrenciesRateSuccess> {
    let params = '';
    params += amount ? `amount=${amount}&` : ``;
    params += fromCurrency ? `fromCurrency=${fromCurrency}&` : ``;
    params += toCurrency ? `toCurrency=${toCurrency}&` : ``;
    params =
      params !== ''
        ? `?${
            params.substr(params.length - 1) === '&'
              ? params.slice(0, -1)
              : params
          }`
        : '';
    return this.http
      .request<GetCurrenciesRateSuccess>(
        'GET',
        `${environment.API_URL}/rate${params}`
      )
      .pipe(delay(environment.API_DELAY));
  }
}
