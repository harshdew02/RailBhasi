import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: 'en',
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      // state mutation
      state.currentLanguage = action.payload;
      //   console.log("Redux op ", state);
    },
  },
});

// actions
export const { setLanguage} = languageSlice.actions;
// reducers
export default languageSlice.reducer;
