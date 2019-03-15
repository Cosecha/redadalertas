import orgApi from "./";
import { authHeader } from "utils/formatting";

async function put(data) {
  let response;
  try {
    const user = { ...data };
    delete user['user'];
    response = await orgApi.put("/user", user, {
      headers: authHeader(data.user),
    });
    return response;
  } catch (err) {
    console.log("User PUT error: ", err.response || err);
    return err;
  }
}

export default eventServices = {
  put
};
