import {
  LOAD_RAIDS,
  VERIFY_RAID,
} from './actions';

const initialState = { raids: [], zipcode: '', isUserVerified: false };

export default function app(state = initialState, action) {
	switch (action.type) {
		case LOAD_RAIDS:
			return {
				...state,
				raids: action.payload,
			};

    case VERIFY_RAID:
      return state;

		default:
			return state;
	}
}
