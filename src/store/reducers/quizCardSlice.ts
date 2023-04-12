import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

interface QuizInList {
  id: string;
  title: string;
  createdAt: Timestamp;
}

interface QuizListState {
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
  },
});

export const { addQuizCardsData, removeQuizCardDatabyId } =
  quizCardSlice.actions;

export default quizCardSlice.reducer;
