// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice'; // Assuming you have an orderSlice file

const store = configureStore({
  reducer: {
    order: orderReducer, // Make sure you import and use the correct reducer
  },
});

export default store;
