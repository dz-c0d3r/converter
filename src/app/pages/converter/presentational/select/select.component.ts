import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  CurrenciesCode,
  CurrenciesCodeEnum,
  CurrenciesLabelEnum,
} from '../../state/converter.model';

@Component({
  selector: 'app-tw-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() currentCurrency: CurrenciesCode | null = null;

  currenciesCodeEnum = CurrenciesCodeEnum;
  currenciesLabelEnum = CurrenciesLabelEnum;
}
