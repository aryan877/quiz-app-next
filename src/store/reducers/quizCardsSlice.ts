import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface QuizInList {
  id: string;
  title: string;
  updatedAt: Timestamp;
  description: string;
}

export interface QuizListState {
  quizzes: QuizInList[];
}

const initialState: QuizListState = {
  quizzes: [],
};

const quizCardSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizCardsData: (state, action: PayloadAction<QuizInList[]>) => {
      state.quizzes = action.payload;
    },
    removeQuizCardDatabyId: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
    removeQuizCardsData: (state) => {
      state.quizzes = [];
    },
  },
});

export const { addQuizCardsData, removeQuizCardDatabyId, removeQuizCardsData } =
  quizCardSlice.actions;

export default quizCardSlice.reducer;
