import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (shippingAddress, thunkAPI) => {
    try {
      const response = await api.post("/orders", {
  shippingAddress,
});
      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to place order"
      );
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/orders");

      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
     const response = await api.get(`/orders/${orderId}`);

      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      const response = await api.patch(`/orders/cancel/${orderId}`);

      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState(state) {
      state.orders = [];
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // PLACE ORDER
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY ORDERS
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ORDER BY ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL ORDER
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;