import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";
import { toast } from "sonner";
import { closeModal } from "./sliceModal";

const initialState = {
  customers: [],
  customer: null,
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await axiosInstance.get("customers");
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

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.post("customers", data);
      const { data: customer } = response;
      toast.success(`Customer an. ${customer.name} berhasil ditambahkan`);
      dispatch(closeModal());
      return customer;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Customer gagal ditambahkan"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.put(`customers`, data);
      const { data: customer } = response;
      toast.success(`customer an. ${customer.name} berhasil diperbarui`);
      dispatch(closeModal());
      return customer;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Customer gagal diperbarui"
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({ url, id }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`${url}/${id}`);

      toast.success(`customer berhasil dihapus`);
      dispatch(closeModal());
      return id;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Customer gagal dihapus"
      );
    }
  }
);

const sliceCustomers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomerById: (state, action) => {
      const customer = state.customers.find(
        (customer) => customer.id === action.payload
      );
      if (customer) {
        state.customer = customer;
      } else {
        state.error = "Customer not found";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = [action.payload, ...state.customers];
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
        if (state.customer?.id === action.payload.id) {
          state.customer = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getCustomerById } = sliceCustomers.actions;
export default sliceCustomers.reducer;
