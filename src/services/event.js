import orgApi from "./";
import authHeader from "utils/headers";

async function post(data) {
  try {
    let response = await orgApi.post("/event", data, {
      headers: authHeader(),
    });
    return response;
  } catch (err) {
    return err;
  }
}

export default eventServices = {
  post
};
