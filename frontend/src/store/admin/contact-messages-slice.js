import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const fetchContactMessages = createAsyncThunk(
  "contactMessages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/messages", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMessageStatus = createAsyncThunk(
  "contactMessages/updateStatus",
  async ({ messageId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/admin/messages/${messageId}/status`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  messages: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const contactMessagesSlice = createSlice({
  name: "contactMessages",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchContactMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update message status
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(updateMessageStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = contactMessagesSlice.actions;

// Selectors
export const selectAllMessages = (state) => state.contactMessages.messages;
export const selectMessagesStatus = (state) => state.contactMessages.status;
export const selectMessagesError = (state) => state.contactMessages.error;

export default contactMessagesSlice.reducer; 