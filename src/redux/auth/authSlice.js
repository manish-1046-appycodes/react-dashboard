import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';
import { getFromLocalStorage, deleteFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  currentUser: getFromLocalStorage(),
  status: getFromLocalStorage() ? 'loggedIn' : 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (loginData, thunkAPI) => {
  try {
    const response = await authService.login(loginData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (registrationData, thunkAPI) => {
  try {
    const response = await authService.register(registrationData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logOutUser = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    const response = await authService.logout();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOutUser: (state) => {
      deleteFromLocalStorage();
      state.error = null;
      state.status = 'idle';
      state.currentUser = null;
    },
    clearAuthError: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'logging';
        state.error = null;
        state.currentUser = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'loggedIn';
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.detail;
        state.status = 'login-error';
        state.currentUser = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'registering';
        state.error = null;
        state.currentUser = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.status = 'registered';
        state.currentUser = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload.detail;
        state.status = 'registration-error';
        state.currentUser = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.error = null;
        state.status = 'idle';
        state.currentUser = null;
      })
      .addCase(logOutUser.rejected, (action) => {
        console.log(action.payload);
      });
  },
});

export default authSlice.reducer;

export const { clearAuthError } = authSlice.actions;

export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthData = (state) => state.auth.currentUser;
