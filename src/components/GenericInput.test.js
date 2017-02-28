import React from 'react';
import ReactDOM from 'react-dom';
import GenericInput from './GenericInput';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<GenericInput />', () => {
  it('should have an input', () => {
    const wrapper = shallow(<GenericInput />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should have a label', () => {
    const wrapper = shallow(<GenericInput />);
    expect(wrapper.find('label')).to.have.length(1);
  });
});
