import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  CurrenciesCode,
  CurrenciesCodeEnum,
  CurrenciesLabelEnum,
  CurrenciesSymbolEnum,
  ExchangeHistory,
  QuotaInformation,
} from '../state/converter.model';
import { ConverterUiActions } from '../state/actions';
import { Store } from '@ngrx/store';
import * as fromSelectors from '../state/selectors/converter.selectors';
import * as fromReducer from '../state/reducers/converter.reducer';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent implements AfterViewInit, OnDestroy {
  amount$: Observable<string>;
  fromCurrency$: Observable<CurrenciesCode>;
  toCurrency$: Observable<CurrenciesCode>;
  exchangeRate$: Observable<number | undefined>;
  variationRate$: Observable<number>;
  exchangeRateWithVariation$: Observable<number | undefined>;
  exchangeHistory$: Observable<ExchangeHistory[]>;
  lastUpdate$: Observable<Date | undefined>;
  quotaInformation$: Observable<QuotaInformation | undefined>;
  maxVariationRateValue$: Observable<number>;
  minVariationRateValue$: Observable<number>;
  variationRateStepValue$: Observable<number>;
  fromCurrencyBaseRate$: Observable<number | undefined>;
  toCurrencyBaseRate$: Observable<number | undefined>;
  keyupSub: Subscription | undefined;
  @ViewChild('amount') amount: ElementRef | undefined;

  constructor(
    private store: Store<fromReducer.ConverterState>,
    private renderer: Renderer2
  ) {
    this.amount$ = this.store.select(fromSelectors.selectAmount);
    this.fromCurrency$ = this.store.select(fromSelectors.selectFromCurrency);
    this.toCurrency$ = this.store.select(fromSelectors.selectToCurrency);
    this.exchangeRate$ = this.store.select(fromSelectors.selectExchangeRate);
    this.variationRate$ = this.store.select(fromSelectors.selectVariationRate);
    this.exchangeRateWithVariation$ = this.store.select(
      fromSelectors.selectExchangeRateWithVariation
    );
    this.exchangeHistory$ = this.store.select(
      fromSelectors.selectExchangeHistory
    );
    this.lastUpdate$ = this.store.select(
      fromSelectors.selectLastUpdateDatetime
    );
    this.quotaInformation$ = this.store.select(
      fromSelectors.selectExchangeRateTooltipInformation
    );
    this.maxVariationRateValue$ = this.store.select(
      fromSelectors.selectMaxVariationRateValue
    );
    this.minVariationRateValue$ = this.store.select(
      fromSelectors.selectMinVariationRateValue
    );
    this.variationRateStepValue$ = this.store.select(
      fromSelectors.selectVariationRateStepValue
    );

    this.fromCurrencyBaseRate$ = this.store.select(
      fromSelectors.selectFromCurrencyBaseExchangeRate
    );
    this.toCurrencyBaseRate$ = this.store.select(
      fromSelectors.selectToCurrencyBaseExchangeRate
    );
  }

  currenciesSymbolEnum = CurrenciesSymbolEnum;
  currenciesCodeEnum = CurrenciesCodeEnum;
  currenciesLabelEnum = CurrenciesLabelEnum;

  ngAfterViewInit() {
    this.keyupSub = fromEvent(this.amount?.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          const value = this.amount?.nativeElement.value;
          if (value >= 1) {
            this._setInput(true);
            this.store.dispatch(
              ConverterUiActions.setAmount({ value: parseFloat(value) })
            );
          } else {
            this._setInput(false);
          }
        })
      )
      .subscribe();
  }

  /**
   * true => set to default style
   * false => set to error style
   * @param state: bool
   * @private
   */
  private _setInput(state: boolean): void {
    const defaultClass = ['focus:border-green-700', 'focus:ring-green-700'];
    const errorClass = ['focus:border-red-700', 'focus:ring-red-700'];
    if (state) {
      for (const cssClass of errorClass) {
        this._setClass(this.amount?.nativeElement, cssClass, 'remove');
      }
      for (const cssClass of defaultClass) {
        this._setClass(this.amount?.nativeElement, cssClass, 'add');
      }
    } else {
      for (const cssClass of defaultClass) {
        this._setClass(this.amount?.nativeElement, cssClass, 'remove');
      }
      for (const cssClass of errorClass) {
        this._setClass(this.amount?.nativeElement, cssClass, 'add');
      }
    }
  }

  /**
   * add or remove class by flag
   * @param element
   * @param cssClass
   * @param flag
   * @private
   */
  private _setClass(
    element: ElementRef,
    cssClass: string,
    flag: 'add' | 'remove'
  ): void {
    if (flag === 'add') {
      this.renderer.addClass(element, cssClass);
    } else if (flag === 'remove') {
      this.renderer.removeClass(element, cssClass);
    }
  }

  onSwitchCurrencyClick() {
    this.store.dispatch(ConverterUiActions.switchCurrenciesRate());
  }

  onVariationRateValueChange($event: number | null) {
    if ($event !== null) {
      this.store.dispatch(
        ConverterUiActions.setVariationRate({ value: $event })
      );
    }
  }

  onConvertBtnClick(data: any) {
    const row = {
      fromCurrencyCode: data.fromCurrency,
      fromCurrencyAmount: data.amount,
      toCurrencyCode: data.toCurrency,
      toCurrencyRate: data.exchangeRate,
      variationRate: data.variationRate,
      toCurrencyRateWithVariation: data.exchangeRateWithVariation,
    } as ExchangeHistory;
    this.store.dispatch(
      ConverterUiActions.addConvertionToHistory({ params: row })
    );
  }

  ngOnDestroy() {
    this.keyupSub?.unsubscribe();
  }
}
