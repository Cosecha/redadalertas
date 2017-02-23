import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Image } from 'semantic-ui-react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render()  {
    return (
      <nav>
        <Menu className="app-menu" pointing secondary>
          <Link className="nav-logo" to={'/'}>
            <h1>RedadAlertas</h1>
          </Link>
          <Menu.Menu position='right'>
            <Image src='http://lorempixel.com/100/100/people' className="profile-icon" alt="profile" avatar />
          </Menu.Menu>
          </Menu>
      </nav>
    )
  }
};

export default Header;
