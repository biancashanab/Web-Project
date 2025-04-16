import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching adopted pets history
export const fetchAdoptedPetsHistory = createAsyncThunk(
  'adoptedPetsHistory/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/orders/adopted-history');
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch adopted pets history');
    }
  }
);

// Create the slice
const adoptedPetsHistorySlice = createSlice({
  name: 'adoptedPetsHistory',
  initialState: {
    adoptedPets: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdoptedPetsHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdoptedPetsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adoptedPets = action.payload;
      })
      .addCase(fetchAdoptedPetsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = adoptedPetsHistorySlice.actions;
export default adoptedPetsHistorySlice.reducer;
