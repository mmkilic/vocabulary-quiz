import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  list: [],
  entity: null,
};

export const fetchAll = createAsyncThunk("words/fetchAll", async () => {
  const response = await axios.get(`${apiUrl}/words`);
  return response.data;
});

export const fetchById = createAsyncThunk("words/fetchById", async (id) => {
  const response = await axios.get(`${apiUrl}/words/${id}`);
  return response.data;
});

export const fetchSearch = createAsyncThunk(
  "words/fetchSearch",
  async (search) => {
    const response = await axios.get(`${apiUrl}/words/search`, {
      headers: { "Content-Type": "application/json" },
      params: { search },
    });
    return response.data;
  }
);

export const fetchSave = createAsyncThunk(
  "words/fetchSave",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/words`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(word),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchUpdateLevel = createAsyncThunk(
  "words/fetchUpdateLevel",
  async (levelUpdate, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${apiUrl}/words/level-updater`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(levelUpdate),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.entity = action.payload;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchSave.fulfilled, (state, action) => {
        state.entity = action.payload;
      })
      .addCase(fetchUpdateLevel.fulfilled, (state, action) => {
        state.entity = action.payload;
      });
  },
});

export const {} = wordSlice.actions;
export default wordSlice.reducer;
