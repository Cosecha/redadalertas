import React, { Component, PropTypes } from 'react';

const GenericInput = (props) => {
	const {
		type,
		label,
		name,
		errorMessage,
		isValid,
		isDirty,
		value = '',
		handleChange
	} = props;
	return(
		<div>
			<label>{label}</label>
			<input
				name={name}
				type={type}
				value={value}
				onChange={handleChange} />
			{
				!isValid && isDirty && <p>{errorMessage}</p>
			}
		</div>
		)
}


GenericInput.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	errorMessage: PropTypes.string,
	validator: PropTypes.func
}

export default GenericInput;
