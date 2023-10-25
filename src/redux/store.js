// store.js

import { configureStore } from '@reduxjs/toolkit';
import excelDataReducer from './excelDataSlice'; // Import the slice you defined

const store = configureStore({
  reducer: {
    excelData: excelDataReducer, // Add your reducer to the store
    // Add more reducers if needed
  },
});

export default store;
