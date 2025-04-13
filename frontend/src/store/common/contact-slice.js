import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact/submit",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    isSubmitting: false,
    submitSuccess: false,
    submitError: "",
  },
  reducers: {
    resetForm: (state) => {
      state.submitSuccess = false;
      state.submitError = "";
      state.isSubmitting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = "";
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload || "There was an error submitting your message. Please try again.";
      });
  },
});

export const { resetForm } = contactSlice.actions;
export default contactSlice.reducer; 