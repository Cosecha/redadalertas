import React from 'react';
import ReactDOM from 'react-dom';
import GenericForm from './GenericForm';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<GenericForm />', () => {
  it('should have a form', () => {
    const wrapper = shallow(<GenericForm />);
    expect(wrapper.find('form')).to.have.length(1);
  });
});
