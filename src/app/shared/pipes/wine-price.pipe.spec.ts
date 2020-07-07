import { WinePricePipe } from './wine-price.pipe';

describe('WinePricePipe', () => {
  it('create an instance', () => {
    const pipe = new WinePricePipe();
    expect(pipe).toBeTruthy();
  });
});
