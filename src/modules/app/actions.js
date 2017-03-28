export const TOGGLE_DRAWER_ACTIVE = 'TOGGLE_DRAWER_ACTIVE';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export function toggleDrawerActive() {
  return {
    type: TOGGLE_DRAWER_ACTIVE
  };
};

export function showSnackbar(message) {
  return {
    type: SHOW_SNACKBAR,
    payload: message
  };
};

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR
  };
};
