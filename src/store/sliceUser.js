import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../utils/api";

const token = Cookies.get("token");

const initialState = {
  userId: "",
  role: "",
  token: token || "",
  loading: false,
  error: null,
};

export const setUser = createAsyncThunk("user/setUser", async (_, thunkAPI) => {
  try {
    const { data: response } = await axiosInstance.get("users/me");
    const { data: user } = response;
    const { id, role } = user;
    return { id, role };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.userId = "";
      state.role = "";
      state.token = "";
      state.loading = false;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        state.loading = false;
        state.userId = id;
        state.role = role;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, logout } = sliceUser.actions;

export default sliceUser.reducer;
