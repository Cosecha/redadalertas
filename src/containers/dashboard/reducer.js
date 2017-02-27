import {
  LOAD_RAIDS,
} from './actions';

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


const initialState = { raids: TEST_RAIDS, zipcode: '', isUserVerified: false };

export default function app(state = initialState, action) {
	switch (action.type) {
		case LOAD_RAIDS:
			return {
				...state,
				raids: action.payload,
			};

		default:
			return state;
	}
};
