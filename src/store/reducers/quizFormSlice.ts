import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OptionType {
  id: number;
  title: string;
  isAnswer: boolean;
}

export interface QuestionType {
  id: number;
  prompt: string;
  points: number;
  options: OptionType[];
}

export interface QuizType {
  id: number;
  title: string;
  description: string;
  questions: QuestionType[];
}

interface QuizState {
  quiz?: QuizType;
}

const initialState: QuizState = {
  quiz: {
    id: 1,
    title: 'My QuizType',
    description: 'This is a sample quiz',
    questions: [
      {
        id: 1,
        prompt: 'What is 1+1?',
        points: 10,
        options: [
          { id: 1, title: '1', isAnswer: false },
          { id: 2, title: '2', isAnswer: true },
          { id: 3, title: '3', isAnswer: false },
          { id: 4, title: '4', isAnswer: false },
        ],
      },
      {
        id: 2,
        prompt: 'What is the capital of France?',
        points: 20,
        options: [
          { id: 1, title: 'New York', isAnswer: false },
          { id: 2, title: 'Paris', isAnswer: true },
          { id: 3, title: 'London', isAnswer: false },
          { id: 4, title: 'Madrid', isAnswer: false },
        ],
      },
    ],
  },
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz(state, action: PayloadAction<QuizType>) {
      state.quiz = action.payload;
    },
    addQuestion(state, action: PayloadAction<QuestionType>) {
      if (state.quiz) {
        state.quiz.questions.push(action.payload);
      }
    },
    updateQuestionPrompt(
      state,
      action: PayloadAction<{ questionId: number; prompt: string }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          question.prompt = action.payload.prompt;
        }
      }
    },
    updateQuestionPoints(
      state,
      action: PayloadAction<{ questionId: number; points: number }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          question.points = action.payload.points;
        }
      }
    },
    updateOptionTitle(
      state,
      action: PayloadAction<{
        questionId: number;
        optionId: number;
        title: string;
      }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          const option = question.options.find(
            (o) => o.id === action.payload.optionId
          );
          if (option) {
            option.title = action.payload.title;
          }
        }
      }
    },
    updateOptionIsAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        optionId: number;
        isAnswer: boolean;
      }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          const option = question.options.find(
            (o) => o.id === action.payload.optionId
          );
          if (option) {
            option.isAnswer = action.payload.isAnswer;
          }
        }
      }
    },
    removeQuestion(state, action: PayloadAction<number>) {
      if (state.quiz) {
        state.quiz.questions = state.quiz.questions.filter(
          (q) => q.id !== action.payload
        );
      }
    },
    addOption(
      state,
      action: PayloadAction<{ questionId: number; option: OptionType }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          question.options.push(action.payload.option);
        }
      }
    },
    removeOption(
      state,
      action: PayloadAction<{ questionId: number; optionId: number }>
    ) {
      if (state.quiz) {
        const question = state.quiz.questions.find(
          (q) => q.id === action.payload.questionId
        );
        if (question) {
          question.options = question.options.filter(
            (o) => o.id !== action.payload.optionId
          );
        }
      }
    },
  },
});

export const {
  setQuiz,
  addQuestion,
  updateQuestionPrompt,
  updateQuestionPoints,
  updateOptionTitle,
  updateOptionIsAnswer,
  removeQuestion,
  addOption,
  removeOption,
} = quizSlice.actions;

export default quizSlice.reducer;
