import { addTodos } from "../actions/todo.action.js";

export default function TodosStore($ngRedux, $rootScope) {
  "ngInject";

  let unsubscribeTokens = [];

  $rootScope.$on('$stateChangeStart', _removeSubscriptions);

  function _removeSubscriptions() {
    while(unsubscribeTokens.length > 0) {
      let token = unsubscribeTokens.pop();
      token();
    }
  }

  return({
    depositTodos(todosList) {
      $ngRedux.dispatch(addTodos(todosList));
    },

    placeListener(listener) {
      debugger
      let unsubscribeFromStore = $ngRedux.subscribe(listener);
      unsubscribeTokens.push(unsubscribeFromStore);
    },

    getUserTodos(params) {
      let todosMap = $ngRedux.getState().todos;
      return Object.values(todosMap);
    }
  });
}
