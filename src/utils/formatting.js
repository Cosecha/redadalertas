function addHours(date, hours) {
  return date + (1000 * 60 * 60 * hours);
}

function authHeader(token) {
    // return authorization header with bearer auth credentials
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
};

export {
  addHours,
  authHeader
};
