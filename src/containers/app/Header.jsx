import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Image } from 'semantic-ui-react';
import logo from './logo.svg';

class Header extends Component {
  render()  {
    return (
      <nav>
        <img src={logo} alt="logo" width="50" height="50" />
      </nav>
    )
  }
};

export default Header;
