import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  petList: [],
  PetDetails: null,
};

export const fetchAllFilteredPets = createAsyncThunk(
  "/pets/fetchAllPets",
  async ({ filterParams, sortParams }) => {
    console.log("Filter params:", filterParams);
    console.log("Sort params:", sortParams);

    const query = new URLSearchParams();
    
    // Handle array parameters correctly
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        query.append(key, value.join(','));
      }
    });
    
    // Add sort parameter
    query.append('sortBy', sortParams);

    console.log("Query string:", query.toString());

    const result = await axios.get(
      `http://localhost:8080/api/shop/pets/get?${query}`
    );

    console.log("API response:", result?.data);

    return result?.data;
  }
);

export const fetchPetDetails = createAsyncThunk(
  "/pets/fetchPetDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:8080/api/shop/pets/get/${id}`
    );

    return result?.data;
  }
);

const shoppingPetSlice = createSlice({
  name: "shoppingPets",
  initialState,
  reducers: {
    setPetDetails: (state) => {
      state.PetDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredPets.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.petList = action.payload.data;
      })
      .addCase(fetchAllFilteredPets.rejected, (state, action) => {
        state.isLoading = false;
        state.petList = [];
      })
      .addCase(fetchPetDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPetDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PetDetails = action.payload.data;
      })
      .addCase(fetchPetDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.PetDetails = null;
      });
  },
});

export const { setPetDetails } = shoppingPetSlice.actions;
export default shoppingPetSlice.reducer;