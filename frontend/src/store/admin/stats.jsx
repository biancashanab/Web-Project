import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    stats: {
        totalPets: 0,
        pendingApplications: 0,
        totalUsers: 0,
        totalContactMessages: 0,
    },
    isLoading: false,
    error: null,
};

export const fetchDashboardStats = createAsyncThunk(
    'adminStats/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/stats/dashboard', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Adăugăm acest parametru pentru a include cookie-urile
            });
            
            if (response.data && response.data.success) {
                return response.data.data;
            } else {
                return rejectWithValue(response.data?.message || 'Failed to fetch stats');
            }
        } catch (error) {
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
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to load dashboard stats.';
            });
    }
});

export const { setStats } = adminStatsSlice.actions;
export default adminStatsSlice.reducer;