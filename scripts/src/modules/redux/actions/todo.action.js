import { TODOS } from '../constants/todo.js';

function addTodo(todo) {
  let todoIdMap = {};
  todoIdMap[todo.id] = todo;

  return({
    type: TODOS.ADD_TODO,
    payload: todoIdMap,
  });
}

function addTodos(todosList) {
  let todosIdMap = {};
  todosList.forEach((todo) => { todosIdMap[todo.id] = todo; });

  return({
    type: TODOS.ADD_TODOS,
    payload: todosIdMap,
  });
}

export { addTodo, addTodos };
