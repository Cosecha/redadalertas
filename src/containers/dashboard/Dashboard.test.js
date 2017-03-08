import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({raids: []});

describe('<Dashboard />', () => {
  it('should have an element with class "dashboard"', () => {
    const wrapper = mount(<Dashboard store={ store } />);
    expect(wrapper.find('.dashboard')).to.have.length(1);
  });
});
