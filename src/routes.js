import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { components as AppComponents } from './containers/app';
import { components as LandingComponents } from './containers/landing';
import { components as SignupComponents } from './containers/signup';
import { components as DashboardComponents } from './containers/dashboard';
import { components as ReportComponents } from './containers/report';

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
          <Route path='/signup/verifier/success' component={SignupComponents.VerifierSuccess} />
          <Route path='/signup/verifier/failure' component={SignupComponents.VerifierFailure} />
          <Route path='/signup/verifier/final' component={SignupComponents.VerifierFinal} />

          <Route path='/dashboard' component={DashboardComponents.Dashboard} />
          <Route path='/report' component={ReportComponents.Report} />
        </Route>
      </Router>
    );
  }
};

export default Routes;
