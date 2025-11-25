import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/api";

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    console.log("Attempting login with:", data);
    const res = await API.post("/auth/login", data);
    console.log("Login response:", res.data);
    
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    
    return res.data.user;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    console.log("Attempting registration with:", data);
    const res = await API.post("/auth/register", data);
    console.log("Register response:", res.data);
    return res.data.user;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;