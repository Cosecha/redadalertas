import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { components as AppComponents } from './containers/app';
import { components as LandingComponents } from './containers/landing';
import { components as SignupComponents } from './containers/signup';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={LandingComponents.Landing} />
        <Route component={AppComponents.App}>
          <Route path='/signup' component={SignupComponents.Signup} />
          <Route path='/signup/confirm' component={SignupComponents.Confirm} />
          <Route path='/signup/success' component={SignupComponents.Success} />
          <Route path='/signup/verifier' component={SignupComponents.Verifier} />
        </Route>
      </Router>
    );
  }
};

export default Routes;
