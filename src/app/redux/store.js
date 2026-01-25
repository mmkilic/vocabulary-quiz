import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import wordReducer from "./wordSlice"
import reportReducer from "./reportSlice";

export default configureStore({
  reducer: {
    quizzes: quizReducer,
    words: wordReducer,
    reports: reportReducer,
  },
});
