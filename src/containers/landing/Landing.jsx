import React, { Component } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';

class Landing extends Component {
  render() {
    const t = this.context.t;

    return (
      <div>
        <h1>{t('Landing')}</h1>
        <Link to="/login">{t('Sign In')}</Link>
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
