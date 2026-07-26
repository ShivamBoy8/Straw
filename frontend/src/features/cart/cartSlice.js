import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const normalizeCartPayload = (payload) => {
  if (!payload) {
    return { items: [], totalPrice: 0 };
  }

  if (payload.cart) {
    return normalizeCartPayload(payload.cart);
  }

  if (Array.isArray(payload)) {
    return { items: payload, totalPrice: 0 };
  }

  return {
    items: payload.items || [],
    totalPrice: payload.totalPrice || 0,
  };
};

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const response = await api.get("/cart");

    return response.data.cart;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch cart",
    );
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, thunkAPI) => {
    try {
      const response = await api.post("/cart/add", cartData);

      return response.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add product",
      );
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ itemId, quantity }, thunkAPI) => {
    try {
      const response = await api.patch(`/cart/items/${itemId}`, { quantity });

      return response.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, thunkAPI) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);

      return response.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to remove item",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.delete("/cart/clear");

      return response.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        const cartData = normalizeCartPayload(action.payload);
        state.loading = false;
        state.items = cartData.items;
        state.totalPrice = cartData.totalPrice;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        const cartData = normalizeCartPayload(action.payload);
        state.loading = false;
        state.items = cartData.items;
        state.totalPrice = cartData.totalPrice;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.error = null;
      })

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const cartData = normalizeCartPayload(action.payload);
        state.loading = false;
        state.items = cartData.items;
        state.totalPrice = cartData.totalPrice;
      })

      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.error = null;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        const cartData = normalizeCartPayload(action.payload);
        state.loading = false;
        state.items = cartData.items;
        state.totalPrice = cartData.totalPrice;
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(clearCart.pending, (state) => {
        state.error = null;
      })

      .addCase(clearCart.fulfilled, (state, action) => {
        const cartData = normalizeCartPayload(action.payload);
        state.loading = false;
        state.items = cartData.items;
        state.totalPrice = cartData.totalPrice;
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
