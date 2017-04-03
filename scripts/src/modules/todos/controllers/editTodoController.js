import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, $state, $uibModal, todosStore, todosRequests) {
  'ngInject';
  let vm = this;

  vm.todo = todosStore.withdrawTodo($state.params.todoId);
  vm.removeStoreSubcription = todosStore.placeListener(() => {
    vm.todo = todosStore.withdrawTodo($state.params.todoId);
  });

  vm.dequeueableForm = true;
  vm.launchDequeueModal = () => {
    let modalInstance = $uibModal.open({
      template: modalTemplate,
      controller: 'dequeueController',
      controllerAs: 'vm'
    });

    modalInstance.result.then(dequeueTodo, logModalDismissed);

    function dequeueTodo() {
      vm.todo.queued = false;
      todosRequests.updateTodo(vm.todo)
      .then(() => $state.go('workbench.todoNotSelected'));
    }

    function logModalDismissed() {
      console.log("MODAL DISMISSED");
    }
  };

  $scope.$watch('vm.todo', () => todosStore.depositTodo(vm.todo), true);

  vm.submit = () => {
    todosStore.depositTodo(vm.todo);
    todosRequests.updateTodo(vm.todo)
    .then((todo) => $state.go('workbench.viewTodo', { todoId: todo.id }))
  }

  $scope.$on("$destroy", () => vm.removeStoreSubcription());
}
