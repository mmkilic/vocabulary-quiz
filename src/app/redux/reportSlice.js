import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  list: [],
  entity: null,
};

export const fetchAll = createAsyncThunk("reports/fetchAll", async (user) => {
  const response = await axios.get(`${apiUrl}/reports/${user}`);
  return response.data;
});

export const fetchSearch = createAsyncThunk(
  "reports/fetchSearch",
  async (searchData) => {
    const response = await axios.get(`${apiUrl}/reports/search`, {
      headers: { "Content-Type": "application/json" },
      params: {
        user: searchData.user,
        search: searchData.search,
      },
    });
    return response.data;
  },
);

export const fetchUpdateLevel = createAsyncThunk(
  "reports/fetchUpdateLevel",
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
  },
);

export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchUpdateLevel.fulfilled, (state, action) => {
        const updatedWord = action.payload;
        const item = state.list.find((r) => r.wordId === updatedWord.id);
        if (item) {
          item.level = updatedWord.level;
        }
      });
  },
});

export const {} = reportSlice.actions;
export default reportSlice.reducer;
