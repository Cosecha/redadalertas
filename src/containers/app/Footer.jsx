import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import ChangeLanguage from './ChangeLanguage';

class Footer extends Component {
  render()  {
    const t = this.context.t;

    return (
      <div>
        <ChangeLanguage />
        <br /><Link to={'/'} >{t('Home')}</Link>
      </div>
    )
  }
};

Footer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
