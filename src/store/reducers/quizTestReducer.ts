import { QuizType } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface QuizState {
  quiz: QuizType;
  currentQuestion: number;
}
const initialState: QuizState = {
  quiz: {
    id: uuidv4(),
    title: 'Untitled Quiz',
    description: 'enter description',
    questions: [],
    timelimit: 10,
  },
  currentQuestion: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quiz = action.payload;
    },
    selectAnswer: (state, action) => {
      const { questionId, answerId } = action.payload;
      const questionIndex = state.quiz.questions.findIndex(
        (q) => q.id === questionId
      );
      const optionIndex = state.quiz.questions[questionIndex].options.findIndex(
        (o) => o.id === answerId
      );
      state.quiz.questions[questionIndex].options.forEach(
        (o) => (o.isAnswer = false)
      );
      state.quiz.questions[questionIndex].options[optionIndex].isAnswer = true;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    moveNext: (state) => {
      state.currentQuestion = Math.min(
        state.currentQuestion + 1,
        state.quiz.questions.length - 1
      );
    },
    movePrev: (state) => {
      state.currentQuestion = Math.max(state.currentQuestion - 1, 0);
    },
  },
});

export const {
  setQuizData,
  selectAnswer,
  setCurrentQuestion,
  moveNext,
  movePrev,
} = quizSlice.actions;
export default quizSlice.reducer;
