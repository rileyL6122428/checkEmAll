export default function EditController($scope, $state, todosStore, todosRequests) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($state.params.todoId);
  vm.removeStoreSubcription = todosStore.placeListener(() => {
    vm.todo = todosStore.withdrawTodo($state.params.todoId);
  });

  $scope.$watch('vm.todo', () => todosStore.depositTodo(vm.todo), true);

  vm.submit = () => {
    todosStore.depositTodo(vm.todo);
    todosRequests.updateTodo(vm.todo)
    .then((todo) => $state.go('workbench.viewTodo', { todoId: todo.id }))
  }

  $scope.$on("$destroy", () => vm.removeStoreSubcription());
}
