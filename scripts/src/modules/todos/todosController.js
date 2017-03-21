export default function TodosController($scope, $ngRedux, todosRequests) {
  'ngInject';
  let vm = this;

  _setupStoreListener();
  todosRequests.getTodos({ userId: 1 });

  function _setupStoreListener() {
    let unsubscribeFromStore = $ngRedux.subscribe(_setState);
    $scope.$on('$destroy', () => unsubscribeFromStore())
  }

  function _setState(state) {
    let test = $ngRedux;
    vm.todos = Object.values($ngRedux.getState().todos);
  }
}
