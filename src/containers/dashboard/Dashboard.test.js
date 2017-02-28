import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Dashboard />', () => {
  it('should have an element with class "dashboard"', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find('.dashboard')).to.have.length(1);
  });
});
