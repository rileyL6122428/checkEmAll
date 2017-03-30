import BaseStore from './baseStore.js';
import { addTodo, addTodos } from "../actions/todo.action.js";

export default class TodosStore extends BaseStore {

  constructor($ngRedux) {
    "ngInject";
    super($ngRedux);
  }

  depositTodo(todo) {
    this.$ngRedux.dispatch(addTodo(todo));
  }

  depositTodos(todosList) {
    this.$ngRedux.dispatch(addTodos(todosList));
  }

  withdrawTodo(id) {
    return this.$ngRedux.getState().todos[id];
  }

  withdrawTodos() {
    let todosMap = this.$ngRedux.getState().todos;
    let todos = Object.values(todosMap);

    return todos;
  }
}
