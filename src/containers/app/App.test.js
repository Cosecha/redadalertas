import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<App />', () => {
  it('should have an element with class "app"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.app')).to.have.length(1);
  });
});
