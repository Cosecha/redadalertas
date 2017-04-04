import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignInForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="login-form">
        <div className="inputs">
          <Field placeholder="email" name="email" component="input" type="email"/>
        </div>
        <div className="inputs">
          <Field placeholder="Password" name="password" component="input" type="password"/>
        </div>
        <button className="login-submit" type="submit">Sign In</button>
      </form>
    );
  }
};

SignInForm = reduxForm({
  form: 'login',
})(SignInForm);

export default SignInForm;
