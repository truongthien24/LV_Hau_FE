import axios from "axios";

const axiosWrapper = axios.create({
  // baseURL: process.env.API_DEV_PATH,
  baseURL: "http://localhost:3001/api",
  // baseURL:
  //   "https://shimmering-syrniki-14c618.netlify.app/.netlify/functions/api",
});

axiosWrapper.interceptors.request.use((config) => {
  const access_token = JSON.parse(localStorage.getItem("jwt"));

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// axiosWrapper.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       if (error.response?.status === 401) {
//         // localStorage.removeItem("jwt");
//         // window.location.replace("/user/redirect-login");
//         return;
//       }
//       return Promise.reject(error.response.data);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default axiosWrapper;
