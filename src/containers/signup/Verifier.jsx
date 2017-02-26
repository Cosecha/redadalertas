import React from 'react';
import GenericForm from '../generic/GenericForm';

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
};

// TODO: add handleSubmit to GenericForm to make api call to database
const Verifier = () => (
  <div>
    <h1> Sign up here to be a verifier </h1>
    <GenericForm
      fieldSchema={FIELDS}
      buttonName="Apply"
    />
  </div>
);

export default Verifier
