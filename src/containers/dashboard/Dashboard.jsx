import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLanguage } from 'redux-i18n';

import RaidInfo from '../../components/RaidInfo';
import { fetchRaids } from '../../modules/raids/actions';

class Dashboard extends Component {

  componentWillMount() {
    this.props.dispatch(fetchRaids());
    this.props.dispatch(setLanguage("en"));
  }

  render() {
    const { raids } = this.props;
    const t = this.context.t;

    return (
      <div className="dashboard">
        <h2>{t('dashboard')}</h2>
        {
          raids.map(raid => (
            <RaidInfo
              key={raid._id}
              raid={raid}
              verifyRaid={this.props.verifyRaid}
              t={t}
            />
          ))
        }
      </div>
    )
  }
}

Dashboard.contextTypes = {
  t: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    raids: state.raids,
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
