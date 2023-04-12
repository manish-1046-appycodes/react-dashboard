import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import searchSlice from './search/searchSlice';
import historySlice from './history/historySlice';
import profileSlice from './profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    history: historySlice,
    profile: profileSlice,
  },
});

export default store;
