import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";
import { toast } from "sonner";
import { closeModal } from "./sliceModal";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await axiosInstance.get("products");
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

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.post("products", data);
      const { data: product } = response;
      toast.success(`Transaksi an. ${product.name} berhasil ditambahkan`);
      dispatch(closeModal());
      return product;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Product gagal ditambahkan"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: response } = await axiosInstance.put(`products`, data);
      const { data: product } = response;
      toast.success(`product an. ${product.name} berhasil diperbarui`);
      dispatch(closeModal());
      return product;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Product gagal diperbarui"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ url, id }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`${url}/${id}`);

      toast.success(`product berhasil dihapus`);
      dispatch(closeModal());
      return id;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Product gagal dihapus"
      );
    }
  }
);

const sliceProducts = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductById: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        state.product = product;
      } else {
        state.error = "Product not found";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [action.payload, ...state.products];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.product?.id === action.payload.id) {
          state.product = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getProductById } = sliceProducts.actions;
export default sliceProducts.reducer;
