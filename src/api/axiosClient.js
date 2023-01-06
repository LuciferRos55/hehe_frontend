/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from "axios";

const a = "https://web2-backend-8wpp.onrender.com";
const b = "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: b,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // "Content-Type": "application/json"
    // Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sentap
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  }

  ,
  (error) =>
    // Do something with request error
    Promise.reject(error)

);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.data
  ,
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLS = ['/auth/local/register', '/user/login'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;