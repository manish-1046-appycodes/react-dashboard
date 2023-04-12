import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import historyService from './historyService';
import { logOutUser } from '../auth/authSlice';

const initialState = {
  data: [],
  error: null,
  status: 'idle',
};

export const getUserHistory = createAsyncThunk('history/get', async (thunkAPI) => {
  try {
    const response = await historyService.getUserHistory();
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserHistory.pending, (state) => {
        state.status = 'fetching-user-history';
        state.error = null;
        state.data = [];
      })
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'fetched-user-history';
        state.data = action.payload?.length ? action.payload?.[0] : action.payload;
      })
      .addCase(getUserHistory.rejected, (state, action) => {
        state.error = action.payload.detail;
        state.status = 'error-fetching-user-history';
        state.data = [];
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.error = null;
        state.status = 'idle';
        state.data = [];
      });
  },
});

export const selectUserHistoryData = (state) => state.history.data;
export const selectUserHistoryError = (state) => state.history.error;
export const selectUserHistoryStatus = (state) => state.history.status;

export default historySlice.reducer;
