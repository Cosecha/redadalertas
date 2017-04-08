import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    const t = this.context.t;

    return (
      <div className="landing-page">
        <div className="overlay">
          <div className="content">
            <h1>{t('RedadAlertas')}</h1>
            <button><Link to="/login">{t('Sign In')}</Link></button>
          </div>
        </div>
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
