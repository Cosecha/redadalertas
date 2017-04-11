import React, { Component } from 'react';
import update from 'react-addons-update';
import GenericInput from './GenericInput';

class GenericForm extends Component {
  constructor(props){
    super(props);

    const fieldnames = Object.keys(props.fieldSchema || {});
    const initialstate = { isValid: false };
    fieldnames.forEach(field => {
      initialstate[field] = {
        name: '',
        isDirty: false,
        isValid: false
      }
    });

    this.state = initialstate;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkAllValid() {
    const fieldnames = Object.keys(this.props.fieldSchema || {});
    const allValid = fieldnames.filter(name => { return !this.state[name].isValid });
    if (allValid.length === 0) {
      if (!this.state.isValid) this.setState({ isValid: true });
    } else {
      if (this.state.isValid) this.setState({ isValid: false });
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state !== oldState) this.checkAllValid();
  }

  handleChange(e){
    const {
      value,
      name
    } = e.target;

    const FIELDS = this.props.fieldSchema || {};
    const isValid = FIELDS[name].validator(value);
    const newState = update(this.state, {
      [name]: {
        value: {$set: value},
        isValid: {$set: isValid},
        isDirty: {$set: true}
      }
    });
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    const {
      isValid
    } = this.state;

    const {
      fieldSchema,
      buttonName = 'Submit'
    } = this.props;

    const FIELDS = fieldSchema || {};
    const fieldnames = Object.keys(FIELDS);

    const inputs = fieldnames.map((field, i) => (
      <GenericInput
        key={i}
        name={field}
        type={FIELDS[field].type}
        options={FIELDS[field].options}
        label={FIELDS[field].label}
        errorMessage={FIELDS[field].errorMessage}
        isValid={this.state[field].isValid}
        isDirty={this.state[field].isDirty}
        value={this.state[field].value}
        handleChange={this.handleChange}
      />
    ));

    return (
      <div>
        <form className="genericForm" onSubmit={this.handleSubmit.bind(this)}>
          {inputs}
          <button
            type="submit"
            disabled={!isValid}>
            { buttonName }
          </button>
        </form>
      </div>
    )
  }
}

export default GenericForm;
