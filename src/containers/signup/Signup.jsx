import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenericForm from '../../components/GenericForm';
import { createSubscriber } from '../../modules/subscribers/actions';

class Signup extends Component {

  // TODO: add saga that makes new subscriber api call to database
  handleSubmit(formState) {
    if (formState.isValid) {
      const phone = formState.phoneNumber.value;
      const zip = formState.zipCode.value;
      this.props.dispatch(createSubscriber(phone, zip));
    }
  }

  render() {
    // TODO: edit validators to validate appropriately
    const FIELDS = {
      phoneNumber: {
        type: 'text',
        label: 'phone number',
        errorMessage: 'Not a valid phone number!',
        validator: number => number.length === 10
      },
      zipCode: {
        type: 'text',
        label: 'zipcode',
        errorMessage: 'Not a valid zipcode!',
        validator: number => number.length === 5
      }
    };

    return (
      <div className='signup'>
        <h1>Subscribe here for alerts</h1>
        <GenericForm handleSubmit={this.handleSubmit.bind(this)}
          fieldSchema={FIELDS}
          buttonName="Subscribe"
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
