import { combineReducers } from 'redux';
import quizFormReducer from './quizFormSlice';

const rootReducer = combineReducers({
  quizform: quizFormReducer,
  // Add more slices here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
