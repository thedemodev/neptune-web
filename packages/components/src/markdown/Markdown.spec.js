import Markdown from './Markdown';
import { render } from '@testing-library/react';

describe('Markdown', () => {
  it('renders html content', () => {
    const { component } = render(<Markdown value={value} />);
    expect(component).toEqual(<h1 />);
  });
});
