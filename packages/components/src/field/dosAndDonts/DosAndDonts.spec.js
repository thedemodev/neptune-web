import React from 'react';
import { mount } from 'enzyme';

import DosAndDonts from './DosAndDonts';

describe('DosAndDonts', () => {
  it('should render dos list only', () => {
    const dos = ['Test this component', 'With multiple dos'];
    const component = mount(<DosAndDonts dos={dos} />);

    expect(component.find('Icon.do')).toHaveLength(2);
  });

  it('should render donts list only', () => {
    const donts = ['Putting things into production without testing'];

    const component = mount(<DosAndDonts donts={donts} />);
    expect(component.find('Icon.dont')).toHaveLength(1);
  });

  it('should render both lists', () => {
    const dos = ['Do this'];
    const donts = [`Don't do that`];

    const component = mount(<DosAndDonts dos={dos} donts={donts} />);
    expect(component.find('Icon.do')).toHaveLength(1);
    expect(component.find('Icon.dont')).toHaveLength(1);
    expect(component.find('.instruction')).toHaveLength(2);
  });
});
