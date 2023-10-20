import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSound: null,
};

export const soundslice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    setGlobalSound: (state, action) => {
      // state mutation
      state.currentSound = action.payload;
      //   console.log("Redux op ", state);
    },
  },
});

// actions
export const { setGlobalSound } = soundslice.actions;
// reducers
export default soundslice.reducer;
