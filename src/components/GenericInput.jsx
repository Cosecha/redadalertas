import React from 'react';

// TODO: add logic to handle non-text inputs, like dropdowns

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

export default GenericInput;
