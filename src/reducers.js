import axios from 'axios';

const RECEIVE_RAIDS = 'RECEIVE_RAIDS';
const UPDATE_RAID = 'UPDATE_RAID';

const INITIAL_STATE = { raids: [], zipcode: '', isUserVerified: false };

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

const receiveRaids = raids => ({
  type: RECEIVE_RAIDS,
  raids: raids
});

const updateRaid = raid => ({
  type: UPDATE_RAID,
  raid: raid
})

// TODO: verifyRaid and loadRaids is using test data
// use commented out code once api endpoints are hooked up

const verifyRaid = raidId => dispatch => {
  // axios.put(`/api/raid/verify/${raidId}`)
  //   .then(resp => dispatch(updateRaid(resp.data)));
  return dispatch(updateRaid(    {
    id: '2',
    time: '5:13PM 2/21/2017',
    location: '10003',
    type: 'work',
    description: '*description here*',
    media: 'www.facebook.com',
    verified: true
  }))
};

const loadRaids = () => dispatch => {
  // axios.get(`/api/raids`)
  //   .then(resp => dispatch(receiveRaids(resp.data)));
  return dispatch(receiveRaids(TEST_RAIDS));
};

const swap = (raids, updatedRaid) =>
  raids.map(raid => raid.id === updatedRaid.id ? updatedRaid : raid);

const rootReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };

  switch(action.type) {
    case RECEIVE_RAIDS:
      newState.raids = action.raids;
      break;
    case UPDATE_RAID:
      newState.raids = swap(newState.raids, action.raid);
      break;
    default:
      break;
  }

  return newState;
}

export { rootReducer, verifyRaid, loadRaids }
