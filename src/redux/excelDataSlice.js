

import { createSlice } from '@reduxjs/toolkit';

const excelDataSlice = createSlice({
  name: 'excelData',
  initialState: {
    data: [], // Initial data state
  },
  reducers: {
    setExcelDataGlo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setExcelDataGlo } = excelDataSlice.actions;

export default excelDataSlice.reducer;
