import { addHours } from "utils/formatting";
import asyncStore from "utils/asyncstorage";
import orgApi from ".";

async function login(data) {
  try {
    const response = await orgApi.post("/auth", data);
    if (response instanceof Error) throw response;
    if (!response) throw new Error("No response.");
    if (!response.data) throw new Error("Response has no data.");
    const credentials = response.data;
    if (!credentials) throw new Error("Login returned no credentials.");
    // store user details and authentication token in local storage
    asyncStore.save("user", JSON.stringify(credentials));
    return credentials;
  } catch (err) {
    console.log("auth login error: ", err.response || err);
    return err;
  }
}

async function logout() {
  let user;
  try {
    user = JSON.parse(await asyncStore.retrieve("user"));
    if (!user) throw new Error("No user to log out.");

    // Delete user details and authentication token from local storage
    asyncStore.remove("user");
    return user;
  } catch (err) {
    console.log("auth logout error: ", err.response || err);
    return err;
  }
}

export default {
  login,
  logout
};
