import React from 'react';
import ReactDOM from 'react-dom';
import RaidInfo from './RaidInfo';
import { shallow } from 'enzyme';
import { expect } from 'chai';

const raid = {
  id: '1',
  time: '10:13AM 2/23/2017',
  location: '11216',
  type: 'blockade',
  description: '*description here*',
  media: 'www.google.com',
  verified: false
};

describe('<RaidInfo />', () => {
  it('should have an element "raidInfo"', () => {
    const wrapper = shallow(<RaidInfo raid={raid} />);
    expect(wrapper.find('.raidInfo')).to.have.length(1);
  });

  it('should have 5 .raidStat elements', () => {
    const wrapper = shallow(<RaidInfo raid={raid} />);
    expect(wrapper.find('.raidStat')).to.have.length(5);
  })
});
