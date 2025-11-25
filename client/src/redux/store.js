import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import designReducer from "./designSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    designs: designReducer,
  },
});