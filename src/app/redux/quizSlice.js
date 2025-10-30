import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  list: [],
  quiz: null,
  qaPair: null,
  answer: null,
  score: null,
  hint: null,
};

export const fetchById = createAsyncThunk("quizzes/fetchById", async (id) => {
  const response = await axios.get(`${apiUrl}/quizzes/${id}`);
  return response.data;
});

export const fetchAll = createAsyncThunk("quizzes/fetchAll", async () => {
  const response = await axios.get(`${apiUrl}/quizzes`);
  return response.data;
});

export const fetchByUserName = createAsyncThunk(
  "quizzes/fetchByUserName",
  async (name) => {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/quizzes/user-name`,
      headers: { "Content-Type": "application/json" },
      params: { name },
    });
    return response.data;
  }
);

export const fetchSearch = createAsyncThunk(
  "quizzes/fetchQuiz",
  async (search) => {
    const response = await axios.get(`${apiUrl}/quizzes/search`, {
      headers: { "Content-Type": "application/json" },
      params: { search },
    });
    return response.data;
  }
);

export const fetchHint = createAsyncThunk(
  "quizzes/fetchHint",
  async (qaPairId) => {
    const response = await axios.get(`${apiUrl}/quizzes/hint`, {
      headers: { "Content-Type": "application/json" },
      params: { qaPairId },
    });
    return response.data;
  }
);

export const fetchStart = createAsyncThunk(
  "quizzes/fetchStart",
  async (newQuiz, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/quizzes/start-new`,
        headers: { "Content-Type": "application/json" },
        data: newQuiz,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchNextQA = createAsyncThunk(
  "quizzes/fetchNextQA",
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/quizzes/next-qa`,
        headers: { "Content-Type": "application/json" },
        params: { id: quizId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unhandled fail");
    }
  }
);

export const fetchAnswer = createAsyncThunk(
  "quizzes/fetchAnswer",
  async (answerRequest, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/quizzes/answer`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(answerRequest),
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
      await axios.delete(`${apiUrl}/quizzes`, {
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
      .addCase(fetchById.fulfilled, (state, action) => {
        state.quiz = action.payload;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchByUserName.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchHint.fulfilled, (state, action) => {
        state.hint = action.payload;
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
