import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import causesReducer from "./causes/causesSlice";
import blogsReducer from "./blogs/blogsSlice"
import walletRequestsReducer from "./walletRequests/walletRequestsSlice"
import feedbackReducer from "./feedback/feedbackSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    causes: causesReducer,
    blogs: blogsReducer,
    walletRequests: walletRequestsReducer,
    feedback: feedbackReducer,
    
  },
});
