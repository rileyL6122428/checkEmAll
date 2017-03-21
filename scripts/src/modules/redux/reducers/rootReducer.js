import { combineReducers } from 'redux';
import { CurrentUserReducer } from './user.reducer.js';
import { TodosReducer } from './todo.reducer.js';

export const RootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  todos: TodosReducer
});
