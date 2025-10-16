import axios from "axios";

import { readAuthCookie } from "./helpers/cookieHelper";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://afrexim-server.onrender.com/api";

// const baseUrl = "https://730026c67fb4.ngrok-free.app/api";

export const axiosInstance = axios.create({
  //create instance
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//set the Auth token for any request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = readAuthCookie("sessionToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);
