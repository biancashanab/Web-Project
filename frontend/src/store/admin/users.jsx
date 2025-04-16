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
            console.log("[DEBUG] Sending delete request for userId:", userId);
            const response = await axios.delete(`http://localhost:8080/api/admin/users/delete/${userId}`, {
                withCredentials: true
            });

            console.log("[DEBUG] Delete response:", response.data);
            if (response.data && response.data.success) {
                // Make sure we're returning the userId from the response
                return { 
                    userId: response.data.userId || userId, 
                    ...response.data 
                };
            } else {
                return rejectWithValue(response.data?.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error("[DEBUG] Delete error:", error);
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
                console.log("[DEBUG] Delete user pending...");
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log("[DEBUG] Delete user fulfilled with payload:", action.payload);
                console.log("[DEBUG] Current userList before filtering:", state.userList);
                state.isLoading = false;
                
                // Make sure we're using the correct userId from the payload
                const userIdToRemove = action.payload.userId;
                console.log("[DEBUG] Removing user with ID:", userIdToRemove);
                
                // Filter out the deleted user
                state.userList = state.userList.filter(user => {
                    const keepUser = user._id !== userIdToRemove;
                    console.log(`[DEBUG] User ${user._id}: ${keepUser ? 'keeping' : 'removing'}`);
                    return keepUser;
                });
                
                console.log("[DEBUG] UserList after filtering:", state.userList);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.log("[DEBUG] Delete user rejected with error:", action.payload);
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete user.';
            });
    }
});

export default adminUsersSlice.reducer;