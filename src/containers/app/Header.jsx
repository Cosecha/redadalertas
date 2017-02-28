import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './site-logo.svg';
import './Header.css';

class Header extends Component {
  render()  {
    return (
      <nav>
        <img src={logo} alt="RedadAlertas" />
      </nav>
    )
  }
};

export default Header;
