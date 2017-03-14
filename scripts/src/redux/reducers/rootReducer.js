import { combineReducers } from 'redux';
import { CurrentUserReducer } from './user.reducer.js';

export const RootReducer = combineReducers({
  currentUser: CurrentUserReducer
});
