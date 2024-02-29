import { configureStore } from '@reduxjs/toolkit';
import * as api from './api';
import { itemsReducer } from './features/Cards/cards-slice';
import { filterReducer } from './features/Filter/filter-slice';
import { paginationReducer } from './features/Pagination/pagination-slice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api
      }
    },
    serializableCheck: false,
  })
});
