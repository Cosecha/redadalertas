export const LOAD_RAIDS = 'LOAD_RAIDS';
export const RECEIVE_RAIDS = 'RECEIVE_RAIDS';
export const UPDATE_RAID = 'UPDATE_RAID';
export const FETCH_RAIDS = 'FETCH_RAIDS';

export function loadRaids(raids) {
  return {
    type: LOAD_RAIDS,
    payload: raids
  }
};

export function receiveRaids(raids) {
  return {
    type: RECEIVE_RAIDS,
    payload: raids
  };
}

export function updateRaid(raid) {
  return {
    type: UPDATE_RAID,
    payload: raid
  };
}

export function fetchRaids() {
  return {
    type: FETCH_RAIDS
  };
}
