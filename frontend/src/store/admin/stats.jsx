import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    stats: {
        totalPets: 0,
        pendingApplications: 0,
        totalUsers: 0,
    },
    isLoading: false,
    error: null,
};

// Thunk to fetch dashboard stats from the new API endpoint
export const fetchDashboardStats = createAsyncThunk(
    'adminStats/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            console.log("[DEBUG] Starting dashboard stats fetch...");
            console.log("[DEBUG] Making request to: http://localhost:8080/api/admin/stats/dashboard");
            
            const response = await axios.get('http://localhost:8080/api/admin/stats/dashboard', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Adăugăm acest parametru pentru a include cookie-urile
            });
            
            console.log("[DEBUG] Raw API Response:", response);
            console.log("[DEBUG] Response status:", response.status);
            console.log("[DEBUG] Response data:", response.data);
            
            if (response.data && response.data.success) {
                console.log("[DEBUG] Successfully fetched stats:", response.data.data);
                return response.data.data;
            } else {
                console.log("[DEBUG] API returned unsuccessful response:", response.data);
                return rejectWithValue(response.data?.message || 'Failed to fetch stats');
            }
        } catch (error) {
            console.error("[DEBUG] Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            return rejectWithValue(error.response?.data?.message || error.message || 'Network error fetching stats');
        }
    }
);

const adminStatsSlice = createSlice({
    name: 'adminStats',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.stats = { ...state.stats, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                console.log("[DEBUG] Stats fetch pending...");
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                console.log("[DEBUG] Stats fetch fulfilled with data:", action.payload);
                state.isLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                console.log("[DEBUG] Stats fetch rejected with error:", action.payload);
                state.isLoading = false;
                state.error = action.payload || 'Failed to load dashboard stats.';
            });
    }
});

export const { setStats } = adminStatsSlice.actions;
export default adminStatsSlice.reducer;