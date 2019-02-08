import asyncStore from "./asyncstorage";

async function checkIfLoggedIn() {
  try {
    const user = JSON.parse(await asyncStore.retrieve('user'));
    if (user && user.expireAt && user.expireAt > Date.now()) {
      return user;
    }
    if (user) await asyncStore.remove('user');
    return null;
  } catch (error) {
    console.log("Error checking login: " + (error.message || error));
    return null;
  }
}

export {
  checkIfLoggedIn
};
