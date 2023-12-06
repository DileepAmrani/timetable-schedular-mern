import axios from "axios";

let baseURL = 'http://localhost:8080/api';

 const axiosInstance  = axios.create({
  baseURL,
  timeout: 36000000, // 60 seconds
});

export default axiosInstance;