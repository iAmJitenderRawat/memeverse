import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Simulated delay for development
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch trending memes
export const fetchTrendingMemes = createAsyncThunk(
  "memes/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      await delay(500);
      const response = await axios.get("https://api.imgflip.com/get_memes");
      return response.data.data.memes.slice(0, 10).map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 50),
        category: "trending",
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch memes with pagination and filtering
export const fetchMemes = createAsyncThunk(
  "memes/fetchMemes",
  async (
    { page = 1, category = "all", sortBy = "trending" },
    { rejectWithValue }
  ) => {
    try {
      await delay(500);
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const start = (page - 1) * 12;
      const end = start + 12;

      let memes = response.data.data.memes.map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 50),
        category: ["trending", "new", "classic"][Math.floor(Math.random() * 3)],
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
      }));

      // Apply category filter
      if (category !== "all") {
        memes = memes.filter((meme) => meme.category === category);
      }

      // Apply sorting
      memes.sort((a, b) => {
        switch (sortBy) {
          case "likes":
            return b.likes - a.likes;
          case "newest":
            return new Date(b.timestamp) - new Date(a.timestamp);
          case "comments":
            return b.comments - a.comments;
          default:
            return 0;
        }
      });
      return {
        memes: memes.slice(start, end),
        hasMore: end < memes.length,
        total: memes.length,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Search memes
export const searchMemes = createAsyncThunk(
  "memes/searchMemes",
  async ({ query, category }, { rejectWithValue }) => {
    try {
      await delay(500);
      const response = await axios.get("https://api.imgflip.com/get_memes");
      let results = response.data.data.memes
        .filter((meme) => meme.name.toLowerCase().includes(query.toLowerCase()))
        .map((meme) => ({
          ...meme,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 50),
          category: ["trending", "new", "classic"][
            Math.floor(Math.random() * 3)
          ],
        }));

      if (category && category !== "all") {
        results = results.filter((meme) => meme.category === category);
      }

      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get meme by ID
export const getMemeById = createAsyncThunk(
  "memes/getMemeById",
  async (id, { rejectWithValue }) => {
    try {
      await delay(300);
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const meme = response.data.data.memes.find((m) => m.id === id);

      if (!meme) {
        throw new Error("Meme not found");
      }

      return {
        ...meme,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 50),
        category: ["trending", "new", "classic"][Math.floor(Math.random() * 3)],
        creator: {
          name: "MemeCreator",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
        },
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for uploading memes
export const uploadMeme = createAsyncThunk(
  'memes/uploadMeme',
  async (formData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll simulate an upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock response
      const mockResponse = {
        id: Date.now().toString(),
        title: formData.get('caption') || 'Untitled Meme',
        url: URL.createObjectURL(formData.get('image')),
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      };

      return mockResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const memesSlice = createSlice({
  name: "memes",
  initialState: {
    trending: [],
    memes: [],
    currentMeme: null,
    hasMore: true,
    total: 0,
    loading: false,
    error: null,
    categories: ["all", "trending", "new", "classic"],
    sortOptions: ["trending", "likes", "newest", "comments"],
  },
  reducers: {
    clearSearchResults: (state) => {
      state.memes = [];
    },
    clearCurrentMeme: (state) => {
      state.currentMeme = null;
    },
    resetMemes: (state) => {
      state.memes = [];
      state.hasMore = true;
      state.total = 0;
    },
    toggleLikeMeme: (state, action) => {
      const { isLiked } = action.payload;
      if (isLiked) {
        state.currentMeme.likes--;
      } else {
        state.currentMeme.likes++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending memes
      .addCase(fetchTrendingMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch memes
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = [...state.memes, ...action.payload.memes];
        state.hasMore = action.payload.hasMore;
        state.total = action.payload.total;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search memes
      .addCase(searchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(searchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload meme cases
      .addCase(uploadMeme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMeme.fulfilled, (state, action) => {
        state.loading = false;
        state.memes.unshift(action.payload);
      })
      .addCase(uploadMeme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get meme by ID
      .addCase(getMemeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMeme = action.payload;
      })
      .addCase(getMemeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults, clearCurrentMeme, resetMemes, toggleLikeMeme } =
  memesSlice.actions;
export default memesSlice.reducer;