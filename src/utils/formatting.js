function addHours(date, hours) {
  return date + (1000 * 60 * 60 * hours);
}

function authHeader(user) {
    // return authorization header with basic auth credentials
    if (user && user.auth) {
        return { 'Authorization': user.auth };
    } else {
        return {};
    }
};

export {
  addHours,
  authHeader
};
