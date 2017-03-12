import React, { Component } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';

import ChangeLanguage from '../../components/redux/ChangeLanguage';

class Landing extends Component {
  render() {
    const t = this.context.t;

    return (
      <div>
        <h1>Landing</h1>
        <ul>
          <li><Link to="/signup">{t('Create account')}</Link></li>
          <li><Link to="/signup/verifier">{t('Sign up to be a verifier')}</Link></li>
          <li><Link to="/dashboard">{t('See list of raids')}</Link></li>
          <li><Link to="/report">{t('Report a raid')}</Link></li>
        </ul>
        <ChangeLanguage />
      </div>
    );
  }
}

Landing.contextTypes = {
  t: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
