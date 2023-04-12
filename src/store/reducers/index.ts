import { combineReducers } from 'redux';
import notificationReducer from './notificationSlice';
import quizCardReducer from './quizCardSlice';
import quizFormReducer from './quizFormSlice';

const rootReducer = combineReducers({
  quizform: quizFormReducer,
  notification: notificationReducer,
  quizCards: quizCardReducer,
  // Add more slices here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
