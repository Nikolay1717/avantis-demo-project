import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadItems = createAsyncThunk(
  '@@cards/load-cards',
  ({page, filter}, {extra: {api}}) => {
    return api.getItems(page, filter);
  } 
)

export const loadFilteredItems = createAsyncThunk(
  '@@filters/load-filtered-items',
  ({searchText, filterBy}, {extra: {api}}) => {
    return api.getFilteredItems(searchText, filterBy);
  }
)

const initialState = {
  status: 'idle',
  error: null,
  items: [],
  retryCount: 0,
}

const itemsSlice = createSlice({
  name: '@@items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadItems.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'loading items error';
        state.retryCount += 1;
        console.log(state.error, `(attempt ${state.retryCount})`);
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.items = action.payload;
        state.retryCount = 0;
      })
      .addCase(loadFilteredItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadFilteredItems.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'loading filtered items error';
        state.retryCount += 1;
        console.log(state.error, `(attempt ${state.retryCount})`);
      })
      .addCase(loadFilteredItems.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.items = action.payload;
        state.retryCount = 0;
      })
  }
})

export const itemsReducer = itemsSlice.reducer;

// selectors
export const selectItems = state => state.items;