import { combineReducers } from 'redux';
import counterReducer from './counterSlice';
import quizFormReducer from './quizFormSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  quizform: quizFormReducer,
  // Add more slices here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
