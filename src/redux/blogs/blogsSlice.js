import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://hope-lfey.onrender.com/api/blog";

/* =========================
   Fetch All Blogs
========================= */
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch blogs");
    }
  }
);

/* =========================
   Create Blog
========================= */
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Create blog failed"
      );
    }
  }
);

/* =========================
   Update Blog
========================= */
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ blogId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update blog failed"
      );
    }
  }
);

/* =========================
   Delete One Blog
========================= */
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return blogId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete blog failed"
      );
    }
  }
);

/* =========================
   Delete All Blogs
========================= */
export const deleteAllBlogs = createAsyncThunk(
  "blogs/deleteAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete all blogs failed"
      );
    }
  }
);

/* =========================
   Slice
========================= */
const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== Fetch ===== */
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Create ===== */
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Update ===== */
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })

      /* ===== Delete One ===== */
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload
        );
      })

      /* ===== Delete All ===== */
      .addCase(deleteAllBlogs.fulfilled, (state) => {
        state.blogs = [];
      });
  },
});

export default blogsSlice.reducer;
