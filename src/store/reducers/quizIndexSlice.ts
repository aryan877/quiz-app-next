import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

interface QuizInList {
  id: number;
  name: string;
  createdAt: Timestamp;
}

interface QuizListState {
  quizzes: QuizInList[];
}

const initialState: QuizListState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizzesList: (state, action: PayloadAction<QuizInList[]>) => {
      state.quizzes = action.payload;
    },
    removeQuizByIdinList: (state, action: PayloadAction<number>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
  },
});

export const { addQuizzesList, removeQuizByIdinList } = quizSlice.actions;

export default quizSlice.reducer;
