import base64 from "base-64";
import orgApi from "./";

async function login(data) {
  try {
    let response = await orgApi.put("/auth", data);
    if (response instanceof Error) throw response;
    if (!response) throw new Error("No response.");
    let credentials = response.data;
    if (!credentials.isValid) throw new Error("Login not valid.");
    let basicAuth = "Basic " + base64.encode(data.username + ":" + data.password);
    credentials.auth = basicAuth;
    return credentials;
  } catch (err) {
    return err;
  }
}

export default authServices = {
  login,
}
