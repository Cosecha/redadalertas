import React, { Component } from 'react';
import update from 'react-addons-update';
import GenericInput from './GenericInput';

const FIELDS = {
  phoneNumber: {
    type: 'text',
    label: 'phone number',
    errorMessage: 'Not a valid phone number!',
    validator: number => number.length === 10
  },
  zipcode: {
    type: 'text',
    label: 'zipcode',
    errorMessage: 'Not a valid zipcode!',
    validator: number => number.length === 5
  }
}

class Signup extends Component {
  constructor(props){
  	super(props);

    const fieldnames = Object.keys(FIELDS);
    const initialstate = {isValid: false};
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

  handleChange(e){
    const {
      value,
      name
    } = e.target;

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

  handleSubmit() {
    console.log('submitting', this.state);
  }

  render() {
  	const {
  		phoneNumber,
  		zipcode,
  		subscriberFormValid,
  		reporterFormValid,
  		isValid
  	} = this.state;

    const fieldnames = Object.keys(FIELDS);

    const inputs = fieldnames.map((field, i) => (
      <GenericInput
        key={i}
        name={field}
        type={FIELDS[field].type}
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
      	<form onSubmit={this.handleSubmit}>
          {inputs}
	        <button
	        	type="submit"
	        	disabled={!isValid}>
	        	Receive alerts
	        </button>
	      </form>
      </div>
    )
  }
}

export default Signup;
