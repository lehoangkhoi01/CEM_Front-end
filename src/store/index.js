import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Login/loginSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
