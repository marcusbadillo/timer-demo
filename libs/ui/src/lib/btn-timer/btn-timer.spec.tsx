import { render } from '@testing-library/react';

import BtnTimer from './btn-timer';

describe('BtnTimer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BtnTimer />);
    expect(baseElement).toBeTruthy();
  });
});
