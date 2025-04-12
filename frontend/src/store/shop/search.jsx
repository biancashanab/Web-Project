import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "pets/search",
  async (keyword) => {
    console.log("Searching for:", keyword);
    const response = await axios.get(
      `http://localhost:8080/api/shop/search/${keyword}`
    );
    console.log("Search response:", response.data);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
        console.log("Search pending");
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Search fulfilled, data:", action.payload);
        state.searchResults = action.payload.data || [];
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
        console.error("Search rejected:", action.error);
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;