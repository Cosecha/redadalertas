import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { setLanguage }      from 'redux-i18n';

class ChangeLanguage extends Component {
  render() {
    const { dispatch, currentLang } = this.props;

    return (
      <div>
        {currentLang !== 'es' &&
           <button onClick={() => dispatch(setLanguage("es"))}>Español</button>}

        {currentLang !== 'en' &&
           <button onClick={() => dispatch(setLanguage("en"))}>English</button>}

        {currentLang !== 'fr' &&
           <button onClick={() => dispatch(setLanguage("fr"))}>Français</button>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    'currentLang': state.i18nState.lang
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);
