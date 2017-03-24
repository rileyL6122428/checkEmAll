import BaseStore from './baseStore.js';
import { addTodo, addTodos } from "../actions/todo.action.js";

export default class TodosStore extends BaseStore {

  constructor($ngRedux, $rootScope) {
    "ngInject";
    super($ngRedux, $rootScope);
  }

  depositTodo(todo) {
    this.$ngRedux.dispatch(addTodo(todo));
  }

  depositTodos(todosList) {
    this.$ngRedux.dispatch(addTodos(todosList));
  }

  withdrawTodos(params) {
    let todosMap = this.$ngRedux.getState().todos;
    let todos = Object.values(todosMap);

    return todos;
  }
}
