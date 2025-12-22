import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, signupAPI } from "./authAPI";

/* =========================
   LOGIN
========================= */
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginAPI(data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("isAdmin", res.isAdmin);

      return {
        user: res.user || null,
        token: res.token,
        id: res.id,
        isAdmin: res.isAdmin,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/* =========================
   SIGNUP (Signup → Login)
========================= */
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      // 1️⃣ إنشاء الحساب
      await signupAPI(data);

      // 2️⃣ تسجيل الدخول مباشرة
      const loginRes = await loginAPI({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", loginRes.token);
      localStorage.setItem("id", loginRes.id);
      localStorage.setItem("isAdmin", loginRes.isAdmin);

      return {
        user: loginRes.user || null,
        token: loginRes.token,
        id: loginRes.id,
        isAdmin: loginRes.isAdmin,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.id = null;
      state.isAdmin = false;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("isAdmin");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isAdmin = action.payload.isAdmin;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isAdmin = action.payload.isAdmin;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
