import { configureStore } from "@reduxjs/toolkit";
import soundSlice from "./soundSlice";

export const store = configureStore({
  reducer: soundSlice,
});
