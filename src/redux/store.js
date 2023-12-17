import { configureStore } from "@reduxjs/toolkit";
import soundSlice from "./soundSlice";
import languageSlice from "./languageSlice";

export const store = configureStore({
  reducer: {
    sound: soundSlice,
    language: languageSlice
  }
});
