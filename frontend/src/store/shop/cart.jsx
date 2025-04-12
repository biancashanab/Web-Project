import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: { items: [] },
  isLoading: false,
  hasOrdered: false, 
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, PetId }, { rejectWithValue }) => {
    try {
      console.log("Sending addToCart:", { userId, PetId }); 
      const response = await axios.post(
        "http://localhost:8080/api/shop/cart/add",
        { userId, PetId }
      );
      console.log("addToCart response:", response.data); 
      if (response.data && response.data.success) {
        return response.data; 
      } else {
        return rejectWithValue(response.data?.message || "Failed to add item");
      }
    } catch (error) {
      console.error("addToCart error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message || "Network or server error");
    }
  }
);


export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return { success: true, data: { userId, items: [] } };
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/shop/cart/get/${userId}`
      );
      if (response.data && response.data.success) {
         return response.data; 
      } else {
         return rejectWithValue(response.data?.message || "Failed to fetch cart")
      }
    } catch (error) {
       console.error("fetchCartItems error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Error fetching cart items");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, PetId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/shop/cart/${userId}/${PetId}`
      );
       if (response.data && response.data.success) {
         return response.data; 
      } else {
         return rejectWithValue(response.data?.message || "Failed to delete item")
      }
    } catch (error) {
      console.error("deleteCartItem error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Error deleting cart item");
    }
  }
);


export const fetchOrderHistory = createAsyncThunk(
  "cart/fetchOrderHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/shop/order/history/${userId}`
      );
      return response.data;
    } catch (error) {
       console.error("fetchOrderHistory error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Error fetching order history");
    }
  }
);

export const clearCartFromDatabase = createAsyncThunk(
  "cart/clearCartFromDatabase",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      console.error("clearCartFromDatabase: userId is missing");
      return rejectWithValue("User ID is required");
    }
    try {
      console.log(`Attempting to clear cart for user ID: ${userId} via API`);
      const response = await axios.post(
        "http://localhost:8080/api/shop/cart/clear",
        { userId }
      );

      console.log("Clear cart API response:", response.data);
      
      if (response.data && response.data.success) {
        return response.data; 
      } else {
        return rejectWithValue(response.data?.message || "Failed to clear cart via API");
      }
    } 
    catch (error) {
      console.error("clearCartFromDatabase Axios error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message || "Network or server error during cart clear");
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
      clearCart: (state) => {
          state.cartItems = { items: [] };
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
           state.cartItems = action.payload.data;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        console.error("addToCart rejected:", action.payload || action.error.message);
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
            state.cartItems = action.payload.data;
        } else {
             state.cartItems = { items: [] }; 
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = { items: [] };
        console.error("fetchCartItems rejected:", action.payload || action.error.message);
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
         if (action.payload.success) {
            state.cartItems = action.payload.data;
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        console.error("deleteCartItem rejected:", action.payload || action.error.message);
      })
      .addCase(fetchOrderHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasOrdered = action.payload?.orders && action.payload.orders.length > 0;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasOrdered = false;
         console.error("fetchOrderHistory rejected:", action.payload || action.error.message);
      })
      .addCase(clearCartFromDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCartFromDatabase.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.cartItems = { items: [] };
        }
      })
      .addCase(clearCartFromDatabase.rejected, (state, action) => {
        state.isLoading = false;
        console.error("clearCartFromDatabase rejected:", action.payload || action.error.message);
      });
  },
});

export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;