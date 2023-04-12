import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import searchService from './searchService';

const initialState = {
  results: [],
  status: 'idle',
  error: null,
};

export const searchLeads = createAsyncThunk('search/leads', async (queries, thunkAPI) => {
  try {
    const response = await searchService.searchLeads(queries);
    return { ...response.data, searchTerm: queries.searchTerm };
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchLeads.pending, (state, action) => {
        state.error = null;
        // state.results = null;
        state.status = 'searching';
      })
      .addCase(searchLeads.fulfilled, (state, action) => {
        state.error = null;
        state.results.unshift(action.payload);
        state.status = 'searched';
      })
      .addCase(searchLeads.rejected, (state, action) => {
        state.error = action.payload.detail;
        //   state.results = action.payload;
        state.status = 'search-error';
      });
  },
});

export const selectSearchLeadData = (state) => state.search.results;
export const selectSearchLeadError = (state) => state.search.error;
export const selectSearchLeadStatus = (state) => state.search.status;

export default searchSlice.reducer;
