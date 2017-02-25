import React, { Component } from 'react';
import update from 'react-addons-update';

const validator = {
	phoneNumber: number => number.length === 10,
	zipcode: number => number.length === 10 
};

class Signup extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		phoneNumber: {
  			name: '',
	  		isDirty: false,
	  		isValid: false
	  	},
  		zicode: {
  			name:'',
	  		isDirty: false,
	  		isValid: false
	  	}
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

			<GenericInput
				type="string",
				label="phone number",
				errorMessage="Not a valid phone number!",
				isValid={phoneNumber.isValid},
				isDirty={phoneNumber.isDirty},
				value={phoneNumber.value}
				/>
			<GenericInput
				type="string",
				label="zipcode",
				errorMessage="Not a valid zipcode!",
				isValid={zipcode.isValid},
				isDirty={zipcode.isDirty},
				value={zipcode.value}
				/>
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
