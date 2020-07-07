import { WineManufacturerPipe } from './wine-manufacturer.pipe';

describe('WineManufacturerPipe', () => {
  it('create an instance', () => {
    const pipe = new WineManufacturerPipe();
    expect(pipe).toBeTruthy();
  });
});
