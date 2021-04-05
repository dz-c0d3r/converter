import * as fromConverter from './converter-ui.actions';

describe('setAmount', () => {
  it('should return an action', () => {
    expect(fromConverter.setAmount({ value: 1 }).type).toBe(
      '[Converter][UI] SET_AMOUNT'
    );
  });
});
