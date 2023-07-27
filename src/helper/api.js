import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authUser");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
