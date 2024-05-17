import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: "http://localhost:3001/api",
});

axiosWrapper.interceptors.request.use((config) => {
  const access_token = JSON.parse(localStorage.getItem("jwt"));

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});


export default axiosWrapper;
