import { WineNamePipe } from './wine-name.pipe';

describe('WineNamePipe', () => {
  it('create an instance', () => {
    const pipe = new WineNamePipe();
    expect(pipe).toBeTruthy();
  });
});
