import orgApi from "./";
import asyncStore from "utils/asyncstorage";
import { authHeader } from "utils/formatting";

async function post(data) {
  let response;
  try {
    const user = JSON.parse(await asyncStore.retrieve("user"));
    response = await orgApi.post("/event", data, {
      headers: authHeader(user.token),
    });
    return response;
  } catch (err) {
    console.log("Event POST error: ", err.response || err);
    return err;
  }
}

async function put(data) {
  let response;
  try {
    const user = JSON.parse(await asyncStore.retrieve("user"));
    response = await orgApi.put("/event", data, {
      headers: authHeader(user.token),
    });
    return response;
  } catch (err) {
    console.log("Event PUT error: ", err.response || err);
    return err;
  }
}

async function gets() {
  let response;
  try {
    response = await orgApi.get("/events");
    return response;
  } catch (err) {
    console.log("Events GET error: ", err.response || err);
    return err;
  }
}

export default eventServices = {
  post,
  put,
  gets
};
