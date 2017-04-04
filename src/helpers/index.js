export const baseUrl = 'http://localhost:8080/api';

export const parseJSON = (response) => {
  return response.json();
};

export const SESSION_TOKEN = 'session_token';
export const USER_ID = 'user_id';
export const PROFILE = 'profile';
export const ACCESS_LEVEL = 'access_level';

export const setStoredAuthData = (sessionToken, userId, profile, accessLevel ) => {
  localStorage.setItem(SESSION_TOKEN, sessionToken);
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(PROFILE, JSON.stringify(profile));
  localStorage.setItem(ACCESS_LEVEL, JSON.stringify(accessLevel));
};

export const removeStoredAuthData = () => {
  localStorage.removeItem(SESSION_TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(PROFILE);
  localStorage.removeItem(ACCESS_LEVEL);
};

export const getStoredAuthData = () => {
  try {
    const sessionToken = localStorage.getItem(SESSION_TOKEN);
    const userId = localStorage.getItem(USER_ID);
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    const accessLevel = JSON.parse(localStorage.getItem(ACCESS_LEVEL));
    return { sessionToken, userId, profile, accessLevel };
  }
  catch (err) {
    removeStoredAuthData();
    return {};
  }
};

export const localSessionTokenExists = () => !!localStorage.getItem(SESSION_TOKEN);

export const requireAuth = (nextState, replaceState) => {
  const isLoggedIn = localSessionTokenExists();
  if (!isLoggedIn) {
    replaceState('/login');
  }
};

export const checkAuth = (current, next, replace) => {
  const isLoggedIn = localSessionTokenExists();
  if(!isLoggedIn){
    replace('/login')
  }
};

export const requireSuperAdmin = (nextState, replaceState) => {
  const isSuperAdmin = localStorage.getItem(ACCESS_LEVEL) === '3';
  if (!isSuperAdmin) {
    replaceState('/');
  }
};
