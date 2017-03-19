import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenericForm from '../../components/GenericForm';

// import {  } from '../../modules/reports/actions';

// TODO: add handleSubmit to GenericForm to make api call to database
class Report extends Component {
  render() {
    const t = this.context.t;

    // TODO: edit validators to validate appropriately
    const FIELDS = {
      date: {
        type: 'text',
        label: t('date'),
        errorMessage: t('Not a valid date.'),
        validator: date => Date.parse(date)
      },
      location: {
        type: 'text',
        label: t('location'),
        errorMessage: t('Not a valid location.'),
        validator: number => number.length === 5
      },
      type: {
        type: 'select',
        label: t('type'),
        errorMessage: t('Please pick a type.'),
        options: ['home', 'work', 'checkpoint'],
        validator: number => number.length === 5
      },
      description: {
        type: 'textarea',
        label: t('description'),
        errorMessage: '',
        validator: () => {}
      }
    };

    return (
      <div>
        <h1>{t('Make a report')}</h1>
        <GenericForm
          fieldSchema={FIELDS}
          buttonName={t('submit')} />
      </div>
    );
  }
};

Report.contextTypes = {
  t: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
