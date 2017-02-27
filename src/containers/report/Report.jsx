import React from 'react';
import GenericForm from '../../components/GenericForm';

// TODO: edit validators to validate appropriately
const FIELDS = {
  date: {
    type: 'text',
    label: 'Date',
    errorMessage: 'Not a valid date!',
    validator: number => number.length === 10
  },
  location: {
    type: 'text',
    label: 'Location',
    errorMessage: 'Not a valid location!',
    validator: number => number.length === 5
  },
  type: {
    type: 'select',
    label: 'Type',
    errorMessage: 'Pick a type!',
    options: ['home', 'work', 'checkpoint'],
    validator: number => number.length === 5
  },
  description: {
    type: 'textarea',
    label: 'Description',
    errorMessage: '',
    validator: () => {}
  }
};

// TODO: add handleSubmit to GenericForm to make api call to database
const Report = () => (
  <div>
    <h1> Make a report </h1>
    <GenericForm
      fieldSchema={FIELDS}
      buttonName="Make report" />
  </div>
);

export default Report;
