import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import causesReducer from "./causes/causesSlice";
import blogsReducer from "./blogs/blogsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    causes: causesReducer,
    blogs: blogsReducer,
    
  },
});
