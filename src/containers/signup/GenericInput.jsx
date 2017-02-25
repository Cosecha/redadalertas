import React, { Component, PropTypes } from 'react';

const GenericInput = (props) => {
	const {
		type,
		label,
		errorMessage,
		isValid,
		isDirty,
		value
	} = this.props;
	return(
		<div>
			<label>{label}</label>
			<input 
				name={label}
				type={type}
				value={value}
				onChange={this.handleChange} />
			{
				!isValid && isDirty && <p>{errorMessage}</p>
			}
		</div>
		)
}


GenericInput.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	errorMessage:: PropTypes.string,
	validator: PropTypes.func
}

export default GenericInput;