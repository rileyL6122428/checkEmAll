import { TODOS } from '../constants/todo.js';

const initialState = {};

export function TodosReducer(prevState = initialState, action) {
  switch(action.type) {
    case TODOS.ADD_TODOS:
      return Object.assign(prevState, action.payload);
    default:
      return prevState;
  }
}
