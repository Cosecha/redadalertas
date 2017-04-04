import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import I18n from 'redux-i18n';

// import testState from './testData';
import configureStore from './store';

import { components as SignInComponents } from './containers/signin';
import { components as AppComponents } from './containers/app';
import { components as LandingComponents } from './containers/landing';
import { components as SignupComponents } from './containers/signup';
import { components as DashboardComponents } from './containers/dashboard';
import { components as ReportComponents } from './containers/report';

import { translations } from "./rootTranslations";

import { requireAuth } from './helpers';

// const initialState = window.INITIAL_STATE;
// TODO: replace testState with this once Redux store is being rendered server-side

// const initialState = testState;
const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
      <I18n translations={translations}>
        <Router history={history}>

          <Route path='/login' component={SignInComponents.SignIn} />
          <Route path='/' component={LandingComponents.Landing} />
          <Route path='/signup' component={SignupComponents.Signup} />
          <Route path='/signup/confirm' component={SignupComponents.Confirm} />
          <Route path='/signup/success' component={SignupComponents.Success} />
          <Route path='/signup/verifier' component={SignupComponents.Verifier} />
          <Route path='/signup/verifier/success' component={SignupComponents.VerifierSuccess} />
          <Route path='/signup/verifier/failure' component={SignupComponents.VerifierFailure} />
          <Route path='/signup/verifier/final' component={SignupComponents.VerifierFinal} />

          <Route component={AppComponents.App} onEnter={requireAuth}>
            <Route path='/dashboard' component={DashboardComponents.Dashboard} />
            <Route path='/report' component={ReportComponents.Report} />
          </Route>
        </Router>
      </I18n>
      </Provider>
    );
  }
};

export default Routes;
