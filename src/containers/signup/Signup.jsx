import React from 'react';
import GenericForm from '../../components/GenericForm';

// TODO: edit validators to validate appropriately
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
const Signup = () => (
  <div>
    <h1> Subscribe here for alerts </h1>
    <GenericForm
      fieldSchema={FIELDS}
      buttonName="Subscribe"
    />
  </div>
);

export default Signup;
