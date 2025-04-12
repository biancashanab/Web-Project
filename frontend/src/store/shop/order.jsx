import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    orderList: [],
    orderDetails: null,
    isLoading: false,
    error: null,
};

export const submitAdoptionApplication = createAsyncThunk(
    'order/submitAdoptionApplication',
    async (applicationData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/shop/order/submit-application', 
                applicationData
            );

            return response.data;
        } catch (error) {
            console.error("Error in submitAdoptionApplication thunk:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Network error or server unreachable' });
        }
    }
);

export const getAllOrdersByUserId = createAsyncThunk(
    'order/getAllOrdersByUserId',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shop/order/list/${userId}`);
            return response.data; 
        } catch (error) {
             console.error("Error in getAllOrdersByUserId thunk:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Network error or server unreachable' });
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shop/order/details/${orderId}`);
            return response.data; 
        } catch (error) {
             console.error("Error in getOrderDetails thunk:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Network error or server unreachable' });
        }
    }
);

const orderSlice = createSlice({
    name: 'shopOrder',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAdoptionApplication.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitAdoptionApplication.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(submitAdoptionApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to submit application.';
            })

            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.success) {
                    state.orderList = action.payload.data;
                } else {
                    state.orderList = [];
                    state.error = action.payload?.message || 'Failed to fetch orders.';
                }
            })
            .addCase(getAllOrdersByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.orderList = [];
                state.error = action.payload?.message || 'Failed to fetch orders.';
            })

             .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.orderDetails = null; 
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                 if (action.payload?.success) {
                    state.orderDetails = action.payload.data;
                } else {
                    state.orderDetails = null;
                    state.error = action.payload?.message || 'Failed to fetch order details.';
                }
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
                 state.error = action.payload?.message || 'Failed to fetch order details.';
            });
    },
});

export const { resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;