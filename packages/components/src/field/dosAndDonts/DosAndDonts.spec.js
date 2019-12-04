import React from 'react';
import { shallow } from 'enzyme';

import DosAndDonts from './DosAndDonts';

describe('DosAndDonts', () => {
  it('should render dos list only', () => {
    const dos = ['Test this component', 'With multiple dos'];
    const component = shallow(<DosAndDonts dos={dos} />);

    expect(component.find('.do')).toHaveLength(2);
  });

  it('should render donts list only', () => {
    const donts = ['Putting things into production without testing'];

    const component = shallow(<DosAndDonts donts={donts} />);
    expect(component.find('.dont')).toHaveLength(1);
  });

  it('should render both lists', () => {
    const dos = ['Do this'];
    const donts = [`Don't do that`];

    const component = shallow(<DosAndDonts dos={dos} donts={donts} />);
    expect(component.find('.do')).toHaveLength(1);
    expect(component.find('.dont')).toHaveLength(1);
    expect(component.find('.item')).toHaveLength(2);
  });
});
