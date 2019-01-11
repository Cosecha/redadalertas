
export const authHeader = ()=> {
    // return authorization header with basic auth credentials
    // let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.auth) {
        return { 'Authorization': 'Basic ' + user.auth };
    } else {
        return {};
    }
};
