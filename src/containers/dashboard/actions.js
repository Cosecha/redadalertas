export const LOAD_RAIDS = 'LOAD_RAIDS';
export const RECEIVE_RAIDS = 'RECEIVE_RAIDS';
export const UPDATE_RAID = 'UPDATE_RAID';

// TODO: verifyRaid and loadRaids is using test data
// use commented out code once api endpoints are hooked up

export function loadRaids(raids) {
  // axios.get(`/api/raids`)
  //   .then(resp => dispatch(receiveRaids(resp.data)));
  return (dispatch, getState)=> {
    dispatch({
      type: LOAD_RAIDS,
      payload: raids
    })
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
