export default function TodosController($scope, $ngRedux, todosRequests) {
  'ngInject';

  _setupStoreListener();
  debugger
  todosRequests.getTodos({ userId: 1 });

  function _setupStoreListener() {
    let unsubscribeFromStore = $ngRedux.subscribe(_setState);
    $scope.$on('$destroy', () => unsubscribeFromStore())
  }

  function _setState(state) {
    let test = $ngRedux;
    debugger
  }
}
