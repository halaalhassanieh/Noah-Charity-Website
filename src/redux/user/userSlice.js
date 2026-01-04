import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =======================
   Thunks
======================= */
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://hope-lfey.onrender.com/api/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch user");
    }
  }
);

export const rechargeWallet = createAsyncThunk(
  "user/rechargeWallet",
  async ({ amount, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://hope-lfey.onrender.com/api/wallet-requests",
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Recharge failed");
    }
  }
);

/* =======================
   Slice
======================= */
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    wallet: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.email = null;
      state.wallet = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetch user */
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.wallet = action.payload.wallet;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* recharge */
      .addCase(rechargeWallet.fulfilled, (state) => {
        // لا نغيّر wallet هنا لأن الموافقة قد تكون لاحقة
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
