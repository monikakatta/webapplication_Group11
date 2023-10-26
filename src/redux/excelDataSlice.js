
import { createSlice } from '@reduxjs/toolkit';

const excelDataSlice = createSlice({
  name: 'excelData',
  initialState: {
    data: [], // Initial data state
    mode: false

  },
  
  reducers: {
    setExcelDataGlo: (state, action) => {
      state.data = action.payload;
    },
    visualMode: (state, action) => {
      {
        state.mode = action.payload
      }
    }

  },
});

export const { setExcelDataGlo, visualMode } = excelDataSlice.actions;
export default excelDataSlice.reducer;
