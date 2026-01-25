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
        search: searchData.search 
      },
    });
    return response.data;
  }
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
      });
  },
});

export const {} = reportSlice.actions;
export default reportSlice.reducer;
