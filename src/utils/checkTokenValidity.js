import jwtDecode from 'jwt-decode';
import { getFromLocalStorage } from './localStorage';

export const isTokenExpired = (token) => {
  const currentTime = new Date().getTime();
  const accessToken = token?.access_token || getFromLocalStorage()?.access_token;
  if (accessToken) {
    const expiryTime = jwtDecode(accessToken)?.exp * 1000;
    console.log('Token Expired: ', currentTime >= expiryTime);
    return currentTime >= expiryTime;
  }
  return 'noToken';
};
