import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true
});

// Async thunks
export const fetchContent = createAsyncThunk(
  'about/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/about/content');
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue('Failed to load content');
    } catch (error) {
      return rejectWithValue('Failed to load content');
    }
  }
);

export const updateContent = createAsyncThunk(
  'about/updateContent',
  async ({ section, newContent }, { getState, rejectWithValue }) => {
    try {
      const currentContent = getState().about.content;
      const updatedContent = {
        ...currentContent,
        [section]: newContent
      };

      const response = await api.put('/admin/about/update', updatedContent);
      
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue('Failed to update content');
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue('Please log in to edit content.');
      } else if (error.response?.status === 403) {
        return rejectWithValue('You do not have permission to edit this content.');
      }
      return rejectWithValue('Failed to update content. Please try again later.');
    }
  }
);

const initialState = {
  content: {
    mission: "",
    goal: "",
    aboutUs: "",
    welcome: "",
    whatWeDo: [],
    petCareGuides: [],
    userReviews: [],
    quote: {
      text: "",
      author: ""
    }
  },
  loading: true,
  error: null,
  editingSection: null,
  editContent: ""
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setEditingSection: (state, action) => {
      const { section, content } = action.payload;
      state.editingSection = section;
      state.editContent = content;
    },
    cancelEditing: (state) => {
      state.editingSection = null;
      state.editContent = "";
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update content
      .addCase(updateContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        state.editingSection = null;
        state.editContent = "";
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setEditingSection, cancelEditing, clearError } = aboutSlice.actions;
export default aboutSlice.reducer; 