import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";
import { toast } from "sonner";
import { closeModal } from "./sliceModal";

const initialState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await axiosInstance.get("bills");
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

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.post("bills/", data);
      const { data: transaction } = response;
      toast.success(
        `Transaksi an. ${transaction.customer.name} berhasil dibuat`
      );
      dispatch(closeModal());
      return transaction;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Transaksi gagal ditambahkan"
      );
    }
  }
);

export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(`bills/${id}`);
      const { data: transaction } = response;
      return transaction;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message ||
          "ErAn error occurred. Please try again.ror"
      );
    }
  }
);

const sliceTransaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = [action.payload, ...state.transactions];
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliceTransaction.reducer;
