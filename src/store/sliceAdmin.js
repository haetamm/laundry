import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";
import { toast } from "sonner";
import { closeModal } from "./sliceModal";

const initialState = {
  admins: [],
  admin: null,
  loading: false,
  error: null,
};

export const fetchAdmins = createAsyncThunk(
  "admin/fetchAdmins",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await axiosInstance.get("users");
      const { data } = response;
      const dataSorted = data
        ? data.sort((a, b) => new Date(b.billDate) - new Date(a.billDate))
        : [];
      return dataSorted;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.post("users", data);
      const { data: admin } = response;
      toast.success(`admin an. ${admin.name} berhasil ditambahkan`);
      dispatch(closeModal());
      return admin;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "User gagal ditambahkan"
      );
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admin/updateAdmin",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.put(`users`, data);
      const { data: admin } = response;
      toast.success(`admin an. ${admin.name} berhasil diperbarui`);
      dispatch(closeModal());
      return admin;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "User gagal diperbarui"
      );
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async ({ url, id }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`${url}/${id}`);

      toast.success(`admin berhasil dihapus`);
      dispatch(closeModal());
      return id;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "User gagal dihapus"
      );
    }
  }
);

const sliceAdmin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAdminById: (state, action) => {
      const admin = state.admins.find((admin) => admin.id === action.payload);
      if (admin) {
        state.admin = admin;
      } else {
        state.error = "Admin not found";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = [action.payload, ...state.admins];
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          (admin) => admin.id === action.payload.id
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
        if (state.admin?.id === action.payload.id) {
          state.admin = action.payload;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getAdminById } = sliceAdmin.actions;
export default sliceAdmin.reducer;
