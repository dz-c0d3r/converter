import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConverterEffects } from './converter.effects';

describe('ConverterEffects', () => {
  let actions$: Observable<any>;
  let effects: ConverterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConverterEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ConverterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
