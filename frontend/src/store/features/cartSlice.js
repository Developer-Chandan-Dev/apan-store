import axios from "axios"; // Axios for API calls
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  cartItems: [],
  isLoading: false,
};

// Thunk to fetch cart items from the backend
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {

      const response = await axios.get(
        `${VITE_API_URL}/api/v1/cart/${userId}`,
        {
          withCredentials: true,
        }
      );
      return response.data; // Assume backend returns the full cart (array of items)
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/v1/cart/`,
        {
          userId,
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data; // Backend should return the newly added cart item with full details
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      console.log(userId, productId);
      const response = await axios.delete(
        `${VITE_API_URL}/api/v1/cart/${userId}/${productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data; // Return the productId to remove it from Redux state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update product quantity in the cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/api/v1/update-cart/`, {
        userId,
        productId,
        quantity,
      });
      return response.data; // Backend returns updated cart item
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

// Export actions
export const { clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
