import { LOCAL_STORAGE_KEY } from '../config/variables';

export const saveToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const getFromLocalStorage = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

export const deleteFromLocalStorage = () => {
  saveToLocalStorage('');
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
