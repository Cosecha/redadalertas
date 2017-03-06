export const LOAD_RAIDS = 'LOAD_RAIDS';
export const RECEIVE_RAIDS = 'RECEIVE_RAIDS';
export const UPDATE_RAID = 'UPDATE_RAID';

// TODO: verifyRaid and loadRaids is using test data
// use commented out code once api endpoints are hooked up

export function loadRaids(raids) {
  return {
    type: LOAD_RAIDS,
    payload: raids
  };
};

export function receiveRaids(raids) {
  return (dispatch, getState)=> {
    dispatch({
      type: RECEIVE_RAIDS,
      payload: raids
    })
  };
}


export function updateRaid(raid) {
  return (dispatch, getState)=> {
    dispatch({
      type: UPDATE_RAID,
      payload: raid
    })
  };
}

export const FETCH_RAID_DATA = 'FETCH_RAID_DATA';
export function fetchRaidData() {
  return {
    type: FETCH_RAID_DATA,
  };
}
