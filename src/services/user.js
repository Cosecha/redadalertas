import orgApi from "./";
import { authHeader } from "utils/formatting";

async function put(data) {
  let response;
  try {
    const user = JSON.parse(await asyncStore.retrieve("user"));
    response = await orgApi.put("/user", data, {
      headers: authHeader(user.token),
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
