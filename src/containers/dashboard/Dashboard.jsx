import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import RaidInfo from '../../components/RaidInfo';
import { fetchRaidData } from './actions';

class Dashboard extends Component {

  componentWillMount() {
    this.props.dispatch(fetchRaidData());
  }

  render() {
    const {
      raids
    } = this.props;

    return (
      <div className="dashboard">
        {
          raids.map(raid => (
            <RaidInfo
              key={raid._id}
              raid={raid}
              verifyRaid={this.props.verifyRaid}
            />
          ))
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    raids: state.dashboard.raids
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
