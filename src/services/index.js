import axios from "axios";

const orgApi = axios.create({
  baseURL: "http://localhost:9999/api/"
});

export default orgApi;
