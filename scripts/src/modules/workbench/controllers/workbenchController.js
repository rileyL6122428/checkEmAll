export default function WorkbenchController($scope, todosStore, todosRequests, todoEditor) {
  'ngInject';
  let vm = this;

  let removeStoreSubcription = todosStore.placeListener(() => {
    vm.todos = todosStore.withdrawQueuedTodos();
  });

  $scope.$on('$destroy', removeStoreSubcription);

  todosRequests.getUserTodos();

  vm.selectNewTodo = () => {
    todoEditor.selectNewTodo();
  };
}
