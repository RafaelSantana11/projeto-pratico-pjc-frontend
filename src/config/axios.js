import axios from "axios";
import { userKey } from "@/global";

const success = (res) => res;

const error = (err) => {
  if (401 === err.response.status) {
    localStorage.removeItem(userKey);
    window.location = "/";
  } else {
    return Promise.reject(err);
  }
};

axios.interceptors.response.use(success, error);

axios.interceptors.request.use(
  async function(config) {
    config.withCredentials = true;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


