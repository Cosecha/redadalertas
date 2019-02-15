import orgApi from "./";
import { authHeader } from "utils/formatting";

async function put(data) {
  let response;
  try {
    const user = { ...data };
    delete event['user'];
    response = await orgApi.put("/user", data, {
      headers: authHeader(data.user),
    });
    // TO-DO: If password changed, create and store new auth credentials
    return response;
  } catch (err) {
    console.log("Event PUT error: ", err.response || err);
    return err;
  }
}

export default eventServices = {
  put
};
