
function authHeader(user) {
    // return authorization header with basic auth credentials
    if (user && user.auth) {
        return { 'Authorization': user.auth };
    } else {
        return {};
    }
};

export default authHeader;
