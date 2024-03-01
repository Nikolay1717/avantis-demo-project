import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadNumberOfPages = createAsyncThunk(
  '@@pagination/get-number-of-pages',
  ({searchText, filterBy}, {extra: {api}}) => {
    return api.getNumberOfPages(searchText, filterBy);
  }
)

const initialState = {
  status: 'idle',
  error: 'null',
  retryCount: 0,
  numberOfPages: 0,
}

const paginationSlice = createSlice({
  name: '@@pagination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNumberOfPages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadNumberOfPages.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'loading number of pages error';
        state.retryCount += 1;
        console.log(state.error, `(attempt ${state.retryCount})`);
      })
      .addCase(loadNumberOfPages.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.numberOfPages = action.payload;
        state.retryCount = 0;
      })
  }
})

export const paginationReducer = paginationSlice.reducer;

// selectors
export const selectPaginationInfo = state => state.pagination;
export const selectNumberOfPages = state => state.pagination.numberOfPages;
export const selectCurrentPage = state => state.pagination.currentPage;