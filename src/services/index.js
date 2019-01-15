import axios from "axios";
import env from "../../env.json";

const orgApi = axios.create({
  baseURL: env.SERVICE_API_URL
});

export default orgApi;
