import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  petList: [],
};

export const addNewPet = createAsyncThunk(
    "/pets/addNewPet",
    async (formData) => {
      const result = await axios.post(
        "http://localhost:8080/api/admin/pets/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );

  export const fetchAllPets = createAsyncThunk(
    "/pets/fetchAllPets",
    async () => {
      const result = await axios.get(
        "http://localhost:8080/api/admin/pets/get"
      );
  
      return result?.data;
    }
  );

  export const editPet = createAsyncThunk(
    "/pets/editPet",
    async ({ id, formData }) => {
      const result = await axios.put(
        `http://localhost:8080/api/admin/pets/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );

  export const deletePet = createAsyncThunk(
    "/pets/deletePet",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:8080/api/admin/pets/delete/${id}`
      );
  
      return result?.data;
    }
  );
  
  const AdminPetsSlice = createSlice({
    name: "adminPets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {    
      builder
        .addCase(fetchAllPets.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllPets.fulfilled, (state, action) => {
          state.isLoading = false;
          state.petList = action.payload.data;
        })
        .addCase(fetchAllPets.rejected, (state) => {
          state.isLoading = false;
          state.petList = [];
        });
    },
  });
  
export const {} = AdminPetsSlice.actions;
export default AdminPetsSlice.reducer;
