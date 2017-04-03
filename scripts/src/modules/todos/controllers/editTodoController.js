import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, $state, $uibModal, todosStore, todosRequests, dequeueModalLauncher) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($state.params.todoId);
  vm.removeStoreSubcription = todosStore.placeListener(() => {
    vm.todo = todosStore.withdrawTodo($state.params.todoId);
  });

  vm.dequeueableForm = true;
  vm.launchDequeueModal = () => {
    dequeueModalLauncher.launchModal(vm.todo);
  };

  vm.submit = () => {
    todosStore.depositTodo(vm.todo);
    todosRequests.updateTodo(vm.todo)
    .then((todo) => $state.go('workbench.viewTodo', { todoId: todo.id }))
  }

  $scope.$watch('vm.todo', () => todosStore.depositTodo(vm.todo), true);

  $scope.$on("$destroy", () => vm.removeStoreSubcription());
}
