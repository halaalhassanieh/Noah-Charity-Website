import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import causesReducer from "./causes/causesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    causes: causesReducer,
    
  },
});
