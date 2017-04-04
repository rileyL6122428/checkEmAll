export default function WorkbenchController($scope, todosStore, todosRequests, statsFactory, todoSelection) {
  'ngInject';
  let vm = this;

  let removeStoreSubcription = todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawQueuedTodos();
    vm.typeStats = statsFactory.newTypeStats(vm.todos);
    vm.completionStats = statsFactory.newCompletionStats(vm.todos);
  });

  $scope.$on('$destroy', removeStoreSubcription);

  todosRequests.getUserTodos();

  vm.selectNewTodo = () => {
    todoSelection.selectNewTodo();
  };
}
