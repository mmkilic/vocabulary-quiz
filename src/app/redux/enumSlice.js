import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  levels: [],
};

export const fetchLevels = createAsyncThunk("enums/levels", async () => {
  const response = await axios.get(`${apiUrl}/enums/levels`);
  return response.data;
});

export const enumSlice = createSlice({
  name: "enums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
      })
  },
});

export const {} = enumSlice.actions;
export default enumSlice.reducer;
