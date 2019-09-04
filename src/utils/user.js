import { Base64 } from "js-base64";
import asyncStore from "./asyncstorage";
import authServices from "services/auth";

async function checkForUserLogin() {
  let user;
  try {
    user = JSON.parse(await asyncStore.retrieve("user"));
    if (!user) return null;
    if (user instanceof Error) throw user;
    if (user && !user.token) throw new Error("No user login token.");

    // Check if header has valid info
    const tokenHeader = JSON.parse(Base64.decode(user.token.split(".")[0]));
    if (!tokenHeader.kid) throw new Error("Missing token key id.");
    if (tokenHeader.kid !== user.username) {
      throw new Error("Login token key id did not match username.");
    }

    if (user) return user;

    // if no user and no errors, remove stored user info from local storage
    // to force new login bc that's shady:
    if (user) await asyncStore.remove("user");
    return null;
  } catch (error) {
    console.log(`Error checking login: ${error.message || error}`);
    if (user) await asyncStore.remove("user");
    return null;
  }
}

export { checkForUserLogin };
