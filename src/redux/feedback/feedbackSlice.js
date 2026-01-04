import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   Thunks
========================= */

// Fetch all feedbacks
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://hope-lfey.onrender.com/api/feedback"
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch feedbacks");
    }
  }
);

// Create feedback
export const createFeedback = createAsyncThunk(
  "feedback/create",
  async ({ subject, message, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://hope-lfey.onrender.com/api/feedback",
        { subject, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create feedback");
    }
  }
);

/* =========================
   Slice
========================= */

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* fetch */
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* create */
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.feedbacks.unshift(action.payload);
      });
  },
});

export default feedbackSlice.reducer;
