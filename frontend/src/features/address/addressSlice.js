import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  address: "",
  loading: false,
  error: null,
};

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/auth/address");

      return response.data.address;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch address",
      );
    }
  },
);
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (address, thunkAPI) => {
    try {
      const response = await api.patch("/auth/address", {
        address,
      });

      return response.data.address;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update address",
      );
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddress(state) {
      state.address = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.address = action.payload;
      })

      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.error = null;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
