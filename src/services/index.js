import axios from "axios";
import { SERVICE_API_URL } from "react-native-dotenv";

const orgApi = axios.create({
  baseURL: SERVICE_API_URL
});

export default orgApi;
