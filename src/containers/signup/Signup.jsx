import React from 'react';
import GenericForm from './GenericForm';

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

const Signup = () => (
  <div>
    <h1> Subscribe here for alerts </h1>
    <GenericForm fieldSchema={FIELDS} />
  </div>
);

export default Signup;
