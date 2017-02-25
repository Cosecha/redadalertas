import axios from 'axios';

const RECEIVE_RAIDS = 'RECEIVE_RAIDS';
const UPDATE_RAID = 'UPDATE_RAID';
const VERIFY_RAID = 'VERIFY_RAID';

const INITIAL_STATE = { raids: [], zipcode: '', isUserVerified: false };

const receiveRaids = raids => ({
  type: RECEIVE_RAIDS,
  raids: raids
});

const updateRaid = raid => ({
  type: UPDATE_RAID,
  raid: raid
})

const verifyRaid = raidId => dispatch => {
  axios.put(`/api/raid/verify/${raidId}`)
    .then(resp => dispatch(updateRaid(resp.data)));
};

const loadRaids = () => dispatch => {
  axios.get(`/api/raids`)
    .then(resp => dispatch(receiveRaids(resp.data)));
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
