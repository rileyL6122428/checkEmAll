import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, todosRequests, dequeueModalLauncher, todoSelection) {
  'ngInject';
  let vm = this;

  let removeListener = todoSelection.placeListener(() => {
    vm.todo = todoSelection.getSelectedTodo();
  });
  $scope.$on('$destroy', removeListener);

  vm.dequeueableForm = true;
  vm.launchDequeueModal = () => {
    dequeueModalLauncher.launchModal(vm.todo);
  };

  vm.submit = () => {
    todosRequests.updateTodo(vm.todo)
    .then((updatedTodo) => {
      todoSelection.switchToViewMode(updatedTodo);
    });
  };
}
