import React, { Component } from 'react';
import { Link } from 'react-router';

import ChangeLanguage from '../../components/redux/ChangeLanguage';

class Footer extends Component {
  render()  {
    return (
      <div>
        <ChangeLanguage />
      </div>
    )
  }
};

export default Footer;
