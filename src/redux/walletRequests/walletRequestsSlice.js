import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   Thunks
========================= */
export const fetchWalletRequests = createAsyncThunk(
  "walletRequests/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://hope-lfey.onrender.com/api/wallet-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // فقط pending
      return res.data.filter((req) => req.status === "pending");
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch requests");
    }
  }
);

export const updateWalletRequest = createAsyncThunk(
  "walletRequests/update",
  async ({ id, userId, amount, status, token }, { rejectWithValue }) => {
    try {
      await axios.put(
        `https://hope-lfey.onrender.com/api/wallet-requests/${id}`,
        {
          user: userId,
          amount,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return id; // نعيد id فقط للحذف من الواجهة
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

/* =========================
   Slice
========================= */
const walletRequestsSlice = createSlice({
  name: "walletRequests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* fetch */
      .addCase(fetchWalletRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWalletRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchWalletRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* update */
      .addCase(updateWalletRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (req) => req._id !== action.payload
        );
      });
  },
});

export default walletRequestsSlice.reducer;
