export const VERIFY_RAID = 'VERIFY_RAID';
export const verifyRaid = raidId => {
  // axios.put(`/api/raid/verify/${raidId}`)
  //   .then(resp => dispatch(updateRaid(resp.data)));
  return {
    type: VERIFY_RAID,
    payload: raidId,
  };
};

export const LOAD_RAIDS = 'LOAD_RAIDS';
export const loadRaids = () => {
  // axios.get(`/api/raids`)
  //   .then(resp => dispatch(receiveRaids(resp.data)));
  return {
    type: LOAD_RAIDS,
    payload: TEST_RAIDS,
  };
};

const TEST_RAIDS = [
  {
    id: '1',
    time: '10:13AM 2/23/2017',
    location: '11216',
    type: 'blockade',
    description: '*description here*',
    media: 'www.google.com',
    verified: false
  },
    {
    id: '2',
    time: '5:13PM 2/21/2017',
    location: '10003',
    type: 'work',
    description: '*description here*',
    media: 'www.facebook.com',
    verified: false
  },
    {
    id: '3',
    time: '7:13AM 2/20/2017',
    location: '12104',
    type: 'home',
    description: '*description here*',
    media: 'www.twitter.com',
    verified: true
  }
];
