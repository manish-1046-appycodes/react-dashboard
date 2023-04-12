import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from './profileService';
import { logOutUser } from '../auth/authSlice';

const initialState = {
  data: [],
  error: null,
  status: 'idle',
};

export const getUserProfile = createAsyncThunk('profile/get', async (thunkAPI) => {
  try {
    const response = await profileService.getUserProfile();
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUserProfile = createAsyncThunk('profile/update', async (data, thunkAPI) => {
  try {
    const response = await profileService.updateUserProfile(data);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'fetching-user-profile';
        state.error = null;
        state.data = [];
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'fetched-user-profile';
        state.data = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload.detail;
        state.status = 'error-fetching-user-profile';
        state.data = [];
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'updating-user-profile';
        state.error = null;
        // state.data = [];
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'updated-user-profile';
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload.detail;
        state.status = 'error-updating-user-profile';
        state.data = [];
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.error = null;
        state.status = 'idle';
        state.data = [];
      });
  },
});

export const selectUserProfileData = (state) => state.profile.data;
export const selectUserProfileError = (state) => state.profile.error;
export const selectUserProfileStatus = (state) => state.profile.status;

export default profileSlice.reducer;
