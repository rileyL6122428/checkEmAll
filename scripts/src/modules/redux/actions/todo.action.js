import { TODOS } from '../constants/todo.js';

function addTodos(todosList) {
  let todosIdMap = {};
  todosList.forEach((todo) => { todosIdMap[todo.id] = todo; });

  return({
    type: TODOS.ADD_TODOS,
    payload: todosIdMap
  });
}

export { addTodos };
