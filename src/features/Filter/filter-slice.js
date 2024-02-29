import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: '',
  filterBy: 'product',
}

const filterSlice = createSlice({
  name: '@@filters',
  initialState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearch: (state) => {
      state.searchText = '';
    }
  }
})

export const {setSearchText, clearSearch, setFilterBy} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

// selectors
export const selectFilter = state => state.filter;
