import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { setLanguage }      from 'redux-i18n';

class ChangeLanguage extends Component {
  constructor(props) {
    super(props);
    this.setSpanish = this.setSpanish.bind(this);
    this.setEnglish = this.setEnglish.bind(this);
    this.setFrench = this.setFrench.bind(this);
  }

  setSpanish() { this.props.dispatch(setLanguage("es")); }
  setEnglish() { this.props.dispatch(setLanguage("en")); }
  setFrench() { this.props.dispatch(setLanguage("fr")); }

  render() {
    const { currentLang } = this.props;
    console.log('currentLang', currentLang);

    const spanishButton = (currentLang === 'es') ? '' : (
      <button onClick={this.setSpanish.bind(this)}>Español</button>
    );
    const englishButton = (currentLang === 'en') ? '' : (
      <button onClick={this.setEnglish.bind(this)}>English</button>
    );
    const frenchButton = (currentLang === 'fr') ? '' : (
      <button onClick={this.setFrench.bind(this)}>Français</button>
    );

    return (
      <div>
        {spanishButton}
        {englishButton}
        {frenchButton}
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
