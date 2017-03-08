import React from 'react';

const RaidInfo = (props) => {
  const {
    type,
    date,
    location,
    description,
    verified,
  } = props.raid;
  const t = props.t;

  return (
    <div className="raidInfo">
      <div className="raidStat col-xs-2"> <h1>{t('time')}</h1> <p>{date}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('location')}</h1> <p>{location}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('type')}</h1> <p>{type}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('description')}</h1> <p>{description}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('verified')}</h1> <p>{verified?'true':'false'}</p> </div >
    </div>
  );
};

export default RaidInfo;
