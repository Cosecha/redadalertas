import React, { Component } from 'react';
import { Link } from 'react-router';

import ChangeLanguage from '../../components/redux/ChangeLanguage';

class Footer extends Component {
  render()  {
    return (
      <div>
        <ChangeLanguage />
        <br /><Link to={'/'} >Home</Link>
      </div>
    )
  }
};

export default Footer;
