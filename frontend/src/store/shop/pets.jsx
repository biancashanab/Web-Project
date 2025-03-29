import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  petList: [],
  petDetails: null,
};

export const fetchAllFilteredPets = createAsyncThunk(
  "/pets/fetchAllPets",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredPets, "fetchAllFilteredPets");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:8080/api/shop/pets/get?${query}`
    );

    console.log(result);

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
      state.petDetails = null;
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
        state.petDetails = action.payload.data;
      })
      .addCase(fetchPetDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.petDetails = null;
      });
  },
});

export const { setPetDetails } = shoppingPetSlice.actions;
export default shoppingPetSlice.reducer;