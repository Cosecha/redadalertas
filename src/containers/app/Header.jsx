import React, { Component } from 'react';
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
