import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaidInfo from '../../components/RaidInfo';
import { fetchRaids } from '../../modules/raids/actions';

class Dashboard extends Component {

  componentWillMount() {
    this.props.dispatch(fetchRaids());
  }

  render() {
    const { raids } = this.props;

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
    raids: state.raids
  };
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
