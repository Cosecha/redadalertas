import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyRaid, loadRaids } from '../../reducers';



const RaidInfo = ({raid, verifyRaid}) => {
  const {
    type,
    time,
    location,
    description,
    media,
    verified
  } = raid;

  return (
    <div className="raidInfo">

      <div className="raidStat col-xs-2"> <h1>Time</h1> <h2>{time}</h2> </div >
      <div className="raidStat col-xs-2"> <h1>Location</h1> <h2>{location}</h2> </div >
      <div className="raidStat col-xs-2"> <h1>Type</h1> <h2>{type}</h2> </div >
      <div className="raidStat col-xs-2"> <h1>Description</h1> <h2>{description}</h2> </div >
      <div className="raidStat col-xs-2"> <h1>Verified</h1> <h2>{verified?'true':'false'}</h2> </div >
      <button onClick={verifyRaid} className="verifyButton"> <h2>Verify</h2> </button>
    </div>
  );
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.props.loadRaids();
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
              verifyRaid={this.props.markAsVerified}
            />
          ))
        }
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, getState) => ({
  markAsVerified: id => dispatch(verifyRaid(id)),
  loadRaids: () => dispatch(loadRaids())
});

const mapStateToProps = state => ({
  raids: state.raids
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
