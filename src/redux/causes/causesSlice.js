import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   Fetch All Causes
========================= */
export const fetchCauses = createAsyncThunk(
  "causes/fetchCauses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://hope-lfey.onrender.com/api/cause"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch causes");
    }
  }
);

/* =========================
   Create Cause (Admin)
========================= */
export const createCause = createAsyncThunk(
  "causes/createCause",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://hope-lfey.onrender.com/api/cause",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create cause failed"
      );
    }
  }
);

/* =========================
   Donate to Cause
========================= */
export const donateToCause = createAsyncThunk(
  "causes/donateToCause",
  async ({ causeId, amount }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://hope-lfey.onrender.com/api/cause/donate/${causeId}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { causeId, amount };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Donation failed"
      );
    }
  }
);

/* =========================
   Delete Cause (Admin)
========================= */
export const deleteCause = createAsyncThunk(
  "causes/deleteCause",
  async (causeId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://hope-lfey.onrender.com/api/cause/${causeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return causeId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* =========================
   Slice
========================= */
const causesSlice = createSlice({
  name: "causes",
  initialState: {
    causes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== Fetch ===== */
      .addCase(fetchCauses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCauses.fulfilled, (state, action) => {
        state.loading = false;
        state.causes = action.payload;
      })
      .addCase(fetchCauses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Create ===== */
      .addCase(createCause.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCause.fulfilled, (state, action) => {
        state.loading = false;
        state.causes.unshift(action.payload);
      })
      .addCase(createCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Donate ===== */
      .addCase(donateToCause.fulfilled, (state, action) => {
        const { causeId, amount } = action.payload;
        const cause = state.causes.find((c) => c._id === causeId);
        if (cause) {
          cause.raised += amount;
        }
      })

      /* ===== Delete ===== */
      .addCase(deleteCause.fulfilled, (state, action) => {
        state.causes = state.causes.filter(
          (cause) => cause._id !== action.payload
        );
      });
  },
});

export default causesSlice.reducer;
