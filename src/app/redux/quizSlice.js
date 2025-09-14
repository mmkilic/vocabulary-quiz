import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  quizzes: [],
  quiz: null,
  qaPair: null,
  answer: null,
  score: null,
};

export const fetchAll = createAsyncThunk(
  "quizzes/fetchAll",
  async () => {
    const response = await axios.get(`${apiUrl}/items`);
    return response.data;
  }
);

export const fetchQuiz = createAsyncThunk(
  "quizzes/fetchQuiz",
  async (search) => {
    const response = await axios.get(`${apiUrl}/items/search`, {
      headers: { "Content-Type": "application/json" },
      params: { search },
    });
    return response.data;
  }
);

export const fetchStart = createAsyncThunk(
  "quizzes/fetchStart",
  async (newItem, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/items`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(newItem),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchNextQA = createAsyncThunk(
  "quizzes/fetchNextQA",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/items/${itemId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchAnswer = createAsyncThunk(
  "quizzes/fetchAnswer",
  async (updatedItem, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${apiUrl}/items`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(updatedItem),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchScore = createAsyncThunk(
  "quizzes/fetchScore",
  async (item, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/items`, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(item),
      });
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.quizzes = action.payload;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload;
      })
      .addCase(fetchStart.fulfilled, (state, action) => {
        state.quiz = action.payload;
      })
      .addCase(fetchNextQA.fulfilled, (state, action) => {
        state.qaPair = action.payload;
      })
      .addCase(fetchAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
      })
      .addCase(fetchScore.fulfilled, (state, action) => {
        state.score = action.payload;
      });
  },
});

export const {} = quizSlice.actions;
export default quizSlice.reducer;
