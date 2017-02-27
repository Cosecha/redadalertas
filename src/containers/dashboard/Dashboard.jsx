import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRaids } from './actions';
import RaidInfo from '../../components/RaidInfo';

class Dashboard extends Component {
  constructor(props){
    super(props);
    // this.props.loadRaids();
  }

  render() {
    const {
      raids
    } = this.props;

    return (
      <div>
        {
          raids.map(raid => (
            <RaidInfo
              key={raid.id}
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
    raids: state.dashboard.raids,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadRaids,
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
