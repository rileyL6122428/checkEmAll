export default function EditController($scope, $state, $stateParams, todosStore, todosRequests) {
  'ngInject';
  let vm = this;
  let workbenchController = $scope.$parent.vm;

  vm.todo = todosStore.withdrawTodo($stateParams.todoId);
  vm.removeStoreSubcription = todosStore.placeListener(() => {
    vm.todo = todosStore.withdrawTodo($stateParams.todoId);
  });

  $scope.$watch('vm.todo', () => {
    todosStore.depositTodo(vm.todo);
  }, true);

  vm.submit = () => {
    todosStore.depositTodo(vm.todo);

    todosRequests.updateTodo(vm.todo)

    .then((todo) => $state.go('workbench.viewTodo', { todoId: todo.id }))
  }

  $scope.$on("$destroy", () => vm.removeStoreSubcription());
}
