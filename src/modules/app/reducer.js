import {
  TOGGLE_DRAWER_ACTIVE,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
} from './actions';

export const initialState = {
  drawerActive: false,
  sidebarPinned: false,
  scrollable: false,
  dialogActive: false,
  snackbarActive: false,
  snackbarMessage: '',
  snackbarSuccess: false,
  dialogMessage: '',
  dialogTitle: ''
};

export const reducer = (state = initialState, action)=> {
  switch (action.type) {
    case TOGGLE_DRAWER_ACTIVE:
      return {
        ...state,
        drawerActive: !state.drawerActive
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarMessage: action.payload,
        snackbarActive: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarActive: false,
        snackbarMessage: ''
      };
    default:
      return state;
  }
}
