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
      <div className="raidStat col-xs-2"> <h1>Time</h1> <p>{time}</p> </div >
      <div className="raidStat col-xs-2"> <h1>Location</h1> <p>{location}</p> </div >
      <div className="raidStat col-xs-2"> <h1>Type</h1> <p>{type}</p> </div >
      <div className="raidStat col-xs-2"> <h1>Description</h1> <p>{description}</p> </div >
      <div className="raidStat col-xs-2"> <h1>Verified</h1> <p>{verified?'true':'false'}</p> </div >
      <button onClick={verifyRaid} className="verifyButton"> <p>Verify</p> </button>
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
