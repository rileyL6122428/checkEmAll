export default function EditController($scope, $stateParams, todosStore, todosRequests) {
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


  $scope.$on("$destroy", () => {
    todosStore.depositTodo(vm.todo);
    vm.removeStoreSubcription();
    todosRequests.updateTodo(vm.todo)

    .then((updatedTodo) => workbenchController.setSelectedTodo(updatedTodo));
  });

}
