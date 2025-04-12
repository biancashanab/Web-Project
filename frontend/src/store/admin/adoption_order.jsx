import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/adminAdoptionOrder/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/orders/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/adminAdoptionOrder/getOrderDetailsForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/orders/details/${id}`
      );
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Failed to fetch order details" });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/adminAdoptionOrder/updateOrderStatus",
  async ({ id, adoptionStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/orders/update/${id}`,
        { adoptionStatus }
      );
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Failed to update status" });
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminAdoptionOrder", 
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload?.success) {
           state.orderList = action.payload.data;
        } else {
           state.orderList = [];
           state.error = action.payload?.message || 'Failed to get orders';
        }
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload?.message || 'Failed to get orders';
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.orderDetails = null;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
         if(action.payload?.success) {
            state.orderDetails = action.payload.data;
         } else {
            state.orderDetails = null;
            state.error = action.payload?.message || 'Failed to get order details';
         }
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
         state.error = action.payload?.message || 'Failed to get order details';
      })
       .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
         if(action.payload?.success) {
            const index = state.orderList.findIndex(order => order._id === action.payload.data._id);
            if (index !== -1) {
                state.orderList[index] = action.payload.data;
            }
            if (state.orderDetails?._id === action.payload.data._id) {
                state.orderDetails = action.payload.data;
            }
         } else {
            state.error = action.payload?.message || 'Failed to update status';
         }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to update status';
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;