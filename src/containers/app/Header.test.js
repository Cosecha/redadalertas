import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Header />', () => {
  it('should have a nav element', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('nav')).to.have.length(1);
  });
});
