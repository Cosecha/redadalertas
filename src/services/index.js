import axios from "axios";

const orgApi = axios.create({
  baseURL: process.env.SERVICE_API_URL
});

export default orgApi;
