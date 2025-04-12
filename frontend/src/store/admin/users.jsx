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
        try 
        {
            const response = await axios.get('http://localhost:8080/api/admin/users/list', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

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

// Thunk to delete a user
export const deleteUser = createAsyncThunk(
    'adminUsers/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/admin/users/delete/${userId}`, {
                withCredentials: true
            });

            if (response.data && response.data.success) {
                return { userId, ...response.data };
            } else {
                return rejectWithValue(response.data?.message || 'Failed to delete user');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Network error deleting user');
        }
    }
);

// Add other thunks later (e.g., updateUserRole)

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersForAdmin.pending, (state) => {
                console.log("[DEBUG] User list fetch pending...");
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsersForAdmin.fulfilled, (state, action) => {
                console.log("[DEBUG] User list fetch fulfilled with data:", action.payload);
                state.isLoading = false;
                state.userList = action.payload;
            })
            .addCase(fetchAllUsersForAdmin.rejected, (state, action) => {
                console.log("[DEBUG] User list fetch rejected with error:", action.payload);
                state.isLoading = false;
                state.error = action.payload || 'Failed to load users.';
                state.userList = [];
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = state.userList.filter(user => user._id !== action.payload.userId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete user.';
            });
    }
});

export default adminUsersSlice.reducer;