import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userList: [],
    isLoading: false,
    error: null,
};

// Thunk to fetch all users for admin
export const fetchAllUsersForAdmin = createAsyncThunk(
    'adminUsers/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/admin/users/list'); // Adjust URL if needed
            if (response.data && response.data.success) {
                return response.data.data; 
            } else {
                return rejectWithValue(response.data?.message || 'Failed to fetch users');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Network error fetching users');
        }
    }
);

// Add other thunks later (e.g., deleteUser, updateUserRole)

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersForAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsersForAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = action.payload;
            })
            .addCase(fetchAllUsersForAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to load users.';
                state.userList = [];
            });
    }
});

export default adminUsersSlice.reducer;