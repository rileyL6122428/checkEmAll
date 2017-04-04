import modalTemplate from '../templates/dequeueModal.html';

export default function EditController($scope, todosRequests, dequeueModalLauncher, todoSelection) {
  'ngInject';
  let vm = this;

  vm.todo = todoSelection.getSelectedTodo();

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
