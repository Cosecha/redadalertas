export const TOGGLE_DRAWER_ACTIVE = 'TOGGLE_DRAWER_ACTIVE';
export function toggleDrawerActive() {
	return {
		type: TOGGLE_DRAWER_ACTIVE
	};
};

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const showSnackbar = (message) => {
	return {
		type: SHOW_SNACKBAR,
		message
	};
};

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const closeSnackbar = () => {
	return {
		type: CLOSE_SNACKBAR
	};
};
