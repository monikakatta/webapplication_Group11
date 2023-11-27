

import { createSlice } from '@reduxjs/toolkit';

const excelDataSlice = createSlice({
  name: 'excelData',
  initialState: {
    data: [], // Initial data state
    mode: false,
    font: 15,
    weight: 400,
    fontFamily: 'Times New Roman, Times, serif',
    undisturbed: false,
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
    },
    setUndisturbed: (state, action) => {
      console.log("Undisturbed action payload:", action.payload);
      state.undisturbed = action.payload; // Action to set undisturbed mode
    },
  },
});

export const { setExcelDataGlo, visualMode, fontFamily, weightMode, fontMode, setUndisturbed } = excelDataSlice.actions;

export default excelDataSlice.reducer;
