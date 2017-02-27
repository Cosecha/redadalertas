import React from 'react';

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
    </div>
  );
};

export default RaidInfo;
