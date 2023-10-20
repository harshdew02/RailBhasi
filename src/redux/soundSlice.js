import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSound: null,
  disabledSound: false,
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
    setDisable: (state, action) => {
      state.disabledSound = action.payload;
    },
  },
});

// actions
export const { setGlobalSound, setDisable } = soundslice.actions;
// reducers
export default soundslice.reducer;
