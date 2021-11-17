import axios from "axios";
import store from "../store";

const API = axios.create();
API.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth;

    // eslint-disable-next-line no-param-reassign
    config.headers['token'] = `${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reject promise if usual error
    return Promise.reject(error);
  }
);
export default API;
