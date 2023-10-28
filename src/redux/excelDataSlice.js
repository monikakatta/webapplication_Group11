
import { createSlice } from '@reduxjs/toolkit';

const excelDataSlice = createSlice({
  name: 'excelData',
  initialState: {
    data: [], // Initial data state
    mode: false,
    font: 15,
    weight: 400,
    fontFamily: 'Times New Roman, Times, serif'
  },
  
  reducers: {
    setExcelDataGlo: (state, action) => {
      state.data = action.payload;
    },
    visualMode: (state, action) => {
      {
        state.mode = action.payload
      }
    },
    fontMode: (state, action) => {
      state.font = action.payload
    },
    weightMode: (state, action) => {
      state.weight = action.payload
    },
    fontFamilyMode: (state, action) => {
      state.fontFamily = action.payload
    }

  },
});

export const { setExcelDataGlo, visualMode, fontFamily, weightMode, fontMode } = excelDataSlice.actions;

export default excelDataSlice.reducer;
