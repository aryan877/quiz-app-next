import { combineReducers } from 'redux';
import notificationReducer from './notificationSlice';
import quizFormReducer from './quizFormSlice';
import quizIndexReducer from './quizIndexSlice';

const rootReducer = combineReducers({
  quizform: quizFormReducer,
  notification: notificationReducer,
  quizIndex: quizIndexReducer,
  // Add more slices here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
