import axios from "axios";

let baseURL = 'https://timetable-schedular-sever.vercel.app/api';

 const axiosInstance  = axios.create({
  baseURL,
  timeout: 36000000, // 60 seconds
});

export default axiosInstance;