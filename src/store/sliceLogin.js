import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { setToken } from "./sliceUser";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (dataForm, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.post(
        "auth/login",
        dataForm
      );
      const { token } = response.data;

      Cookies.set("token", token);
      toast.success(`Welcome!`);
      dispatch(setToken({ token }));
      return { token };
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const sliceLogin = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliceLogin.reducer;
