import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { components as AppComponents } from './containers/app';
import { components as LandingComponents } from './containers/landing';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={LandingComponents.Landing} />
        <Route component={AppComponents.App}>

        </Route>
      </Router>
    );
  }
};

export default Routes;
