import BaseStore from './baseStore.js';
import { addTodos } from "../actions/todo.action.js";

export default class TodosStore extends BaseStore {

  constructor($ngRedux, $rootScope) {
    "ngInject";
    super($ngRedux, $rootScope);
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
