import axios from "axios";

const orgApi = axios.create({
  baseURL: "http://localhost:8080/api/"
});

export default orgApi;
