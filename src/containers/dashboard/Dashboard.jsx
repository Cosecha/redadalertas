import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyRaid, loadRaids } from '../../reducers';

const TEST_RAIDS = [
  {
    id: '1',
    time: 'today',
    location: 'NY NY',
    type: 'blockade',
    description: 'hello world',
    media: 'www.google.com',
    verified: false
  }
];

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
    <div>
      <div> Time </div>
      <div> {time} </div>
      <div> location </div>
      <div> {location} </div>
      <div> type </div>
      <div> {type} </div>
      <div> description </div>
      <div> {description} </div>
      <div> media </div>
      <div> {media} </div>
      <div> verified </div>
      <div> {verified} </div>
      <button onClick={verifyRaid}> Mark as verified </button>
    </div>
  );
};

class Dashboard extends Component {
  render() {
    // const {
    //   raids
    // } = this.props;

    const raids = TEST_RAIDS;

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
  markAsVerified: id => dispatch(verifyRaid(id))
});

const mapStateToProps = state => ({
  raids: state.raids
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
