import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/messages", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { success: false });
    }
  }
);

export const updateMessageStatus = createAsyncThunk(
  "contact/updateMessageStatus",
  async ({ messageId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/admin/messages/${messageId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { success: false });
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch messages";
      })
      // Update Message Status
      .addCase(updateMessageStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedMessage = action.payload;
        state.messages = state.messages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        );
      })
      .addCase(updateMessageStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update message status";
      });
  },
});

export default contactSlice.reducer; 