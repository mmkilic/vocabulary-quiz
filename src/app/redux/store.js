import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import wordReducer from "./wordSlice"

export default configureStore({
  reducer: {
    quizzes: quizReducer,
    words: wordReducer,
  },
});
