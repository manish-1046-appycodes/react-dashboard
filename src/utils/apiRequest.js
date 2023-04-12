import axios from 'axios';
import { BASE_URL } from '../config/variables';

const axiosConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const publicRequest = axios.create(axiosConfig);
export const privateRequest = axios.create(axiosConfig);

privateRequest.interceptors.request.use(async (config) => {
  const token = store?.getState()?.auth?.currentUser?.access_token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';

  // Check if token expired
  // if (token && (await isTokenExpired(token))) {
  //   console.log("Token expired.... ");
  //   try {
  //     const newToken = await refreshAccessToken();
  //     const { accessToken } = newToken.response.data;
  //     store.dispatch(updateToken(accessToken));
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //   } catch (error) {
  //     store.dispatch(logout());
  //   }
  // }
  return config;
});
