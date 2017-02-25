import React, { Component } from 'react';

const validator = {
	phoneNumber: number => number.length === 10,
	zipcode: number => number.length === 10 
};

class Signup extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		pn: '',
  		pnDirty: false,
  		pnIsValid: false,
  		zip: '',
  		zipDirty: false,
  		zipIsValid: false
  	};

  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
  	const value = e.target.value;
  	const isValid = this.props.validator(value);
  	this.setState({
  		value,
  		isValid,
  		isPristine: false
  	});
  }


  validateField(fieldName, fieldValue){

  }

  subscriberFormIsValid(){}

  render() {

  	const handleSubmit = ()=>{};
  	const { 
  		phoneNumber, 
  		zipcode, 
  		subscriberFormValid, 
  		reporterFormValid,
  		isValid
  	} = this.state;

    return (
      <div>
      	<form onSubmit={handleSubmit}>

	        <label>Phone Number</label>
	        <input 
	        	name="phoneNumber"
	        	type="text"
	        	value={phoneNumber}
	        	onChange={this.handleChange} />
	        <label>Zipcode</label>
	        <input 
	        	name="zipcode"
	        	type="text"
	        	value={zipcode}
	        	onChange={this.handleChange} />

	        <button
	        	type="submit"
	        	disabled={!isValid}>
	        	Receive alerts
	        </button>

	    </form>

	    <form onSubmit={handleSubmit}>

        <h1>Register to report alerts</h1>

        </form>
      </div>
    )
  }
}

export default Signup;
